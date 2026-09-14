package ch.tbz.recipe.planner.service;

import ch.tbz.recipe.planner.domain.Ingredient;
import ch.tbz.recipe.planner.domain.Recipe;
import ch.tbz.recipe.planner.domain.Unit;
import ch.tbz.recipe.planner.entities.RecipeEntity;
import ch.tbz.recipe.planner.mapper.RecipeEntityMapper;
import ch.tbz.recipe.planner.repository.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RecipeServiceTest {

    @Mock
    private RecipeEntityMapper mapper;

    @Mock
    private RecipeRepository repository;

    @InjectMocks
    private RecipeService service;

    @Test
    void updateRecipe_savesRecipeWithId() {
        UUID id = UUID.randomUUID();
        Recipe recipe = new Recipe(null, "Pizza", "New description", "http://image.url", List.of());
        RecipeEntity entity = new RecipeEntity(id, "Pizza", "New description", "http://image.url", List.of());
        when(repository.findById(id)).thenReturn(Optional.of(entity));
        when(mapper.domainToEntity(recipe)).thenReturn(entity);
        when(repository.save(entity)).thenReturn(entity);
        when(mapper.entityToDomain(entity)).thenReturn(recipe);

        Recipe result = service.updateRecipe(id, recipe);

        assertThat(result.getId()).isEqualTo(id);
        verify(repository).save(entity);
    }

    @Test
    void updateRecipe_unknownId_throwsNotFound() {
        UUID id = UUID.randomUUID();
        when(repository.findById(id)).thenReturn(Optional.empty());
        Recipe recipe = new Recipe(null, "Pizza", "Description", "http://image.url", List.of());

        assertThatThrownBy(() -> service.updateRecipe(id, recipe))
                .isInstanceOf(ResponseStatusException.class)
                .extracting("statusCode").isEqualTo(HttpStatus.NOT_FOUND);
        verify(repository, never()).save(any());
    }

    @Test
    void updateRecipe_emptyName_throwsBadRequest() {
        UUID id = UUID.randomUUID();
        Recipe recipe = new Recipe(null, " ", "Description", "http://image.url", List.of());

        assertThatThrownBy(() -> service.updateRecipe(id, recipe))
                .isInstanceOf(ResponseStatusException.class)
                .extracting("statusCode").isEqualTo(HttpStatus.BAD_REQUEST);
        verify(repository, never()).save(any());
    }

    @Test
    void updateRecipe_amountZero_throwsBadRequest() {
        UUID id = UUID.randomUUID();
        Ingredient tomato = new Ingredient(null, "Tomato", null, Unit.PIECE, 0);
        Recipe recipe = new Recipe(null, "Pizza", "Description", "http://image.url", List.of(tomato));

        assertThatThrownBy(() -> service.updateRecipe(id, recipe))
                .isInstanceOf(ResponseStatusException.class)
                .extracting("statusCode").isEqualTo(HttpStatus.BAD_REQUEST);
        verify(repository, never()).save(any());
    }
}
