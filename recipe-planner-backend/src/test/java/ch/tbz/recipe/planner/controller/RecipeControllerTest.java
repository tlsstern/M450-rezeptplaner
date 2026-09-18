package ch.tbz.recipe.planner.controller;

import ch.tbz.recipe.planner.domain.Ingredient;
import ch.tbz.recipe.planner.domain.Recipe;
import ch.tbz.recipe.planner.domain.Unit;
import ch.tbz.recipe.planner.mapper.RecipeEntityMapper;
import ch.tbz.recipe.planner.repository.RecipeRepository;
import ch.tbz.recipe.planner.service.RecipeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RecipeController.class)
class RecipeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RecipeService service;

    @MockBean
    private RecipeEntityMapper mapper;

    // needed because the CommandLineRunner in RecipePlannerApplication wants the repository
    @MockBean
    private RecipeRepository repository;

    private Recipe createRecipe(UUID id) {
        Ingredient tomato = new Ingredient(UUID.randomUUID(), "Tomato", "The big ones", Unit.PIECE, 5);
        return new Recipe(id, "Lasagne", "Some description", "http://image.url", List.of(tomato));
    }

    @Test
    void getRecipes_returnsAllRecipes() throws Exception {
        when(service.getRecipes()).thenReturn(List.of(createRecipe(UUID.randomUUID()), createRecipe(UUID.randomUUID())));

        mockMvc.perform(get("/api/recipes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Lasagne"));
    }

    @Test
    void getRecipe_returnsRecipeWithId() throws Exception {
        UUID id = UUID.randomUUID();
        when(service.getRecipeById(id)).thenReturn(createRecipe(id));

        mockMvc.perform(get("/api/recipes/recipe/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.ingredients[0].name").value("Tomato"));
    }

    @Test
    void addRecipe_returnsSavedRecipe() throws Exception {
        UUID id = UUID.randomUUID();
        when(service.addRecipe(any(Recipe.class))).thenReturn(createRecipe(id));

        String json = """
                {"name": "Lasagne", "description": "Some description", "imageUrl": "http://image.url",
                 "ingredients": [{"name": "Tomato", "comment": "The big ones", "unit": "PIECE", "amount": 5}]}
                """;

        mockMvc.perform(post("/api/recipes").contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.name").value("Lasagne"));
    }

    @Test
    void updateRecipe_returnsUpdatedRecipe() throws Exception {
        UUID id = UUID.randomUUID();
        when(service.updateRecipe(eq(id), any(Recipe.class))).thenReturn(Optional.of(createRecipe(id)));

        mockMvc.perform(put("/api/recipes/" + id).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"Lasagne\", \"ingredients\": []}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()));
    }

    @Test
    void updateRecipe_unknownId_returnsNotFound() throws Exception {
        UUID id = UUID.randomUUID();
        when(service.updateRecipe(eq(id), any(Recipe.class))).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/recipes/" + id).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"Lasagne\", \"ingredients\": []}"))
                .andExpect(status().isNotFound());
    }

    @Test
    void updateRecipe_emptyName_returnsBadRequest() throws Exception {
        mockMvc.perform(put("/api/recipes/" + UUID.randomUUID()).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"\", \"ingredients\": []}"))
                .andExpect(status().isBadRequest());

        verify(service, never()).updateRecipe(any(), any());
    }

    @Test
    void updateRecipe_amountZero_returnsBadRequest() throws Exception {
        mockMvc.perform(put("/api/recipes/" + UUID.randomUUID()).contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name": "Lasagne", "ingredients": [{"name": "Tomato", "unit": "PIECE", "amount": 0}]}
                                """))
                .andExpect(status().isBadRequest());

        verify(service, never()).updateRecipe(any(), any());
    }

    @Test
    void updateRecipe_ingredientWithoutName_returnsBadRequest() throws Exception {
        mockMvc.perform(put("/api/recipes/" + UUID.randomUUID()).contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name": "Lasagne", "ingredients": [{"name": "", "unit": "PIECE", "amount": 1}]}
                                """))
                .andExpect(status().isBadRequest());

        verify(service, never()).updateRecipe(any(), any());
    }
}
