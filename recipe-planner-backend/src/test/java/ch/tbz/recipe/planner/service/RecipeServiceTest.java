package ch.tbz.recipe.planner.service;

import ch.tbz.recipe.planner.domain.Recipe;
import ch.tbz.recipe.planner.entities.RecipeEntity;
import ch.tbz.recipe.planner.mapper.RecipeEntityMapper;
import ch.tbz.recipe.planner.repository.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
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
    void updateRecipe_existingRecipe_isSaved() {
        UUID id = UUID.randomUUID();
        Recipe recipe = new Recipe(null, "Pizza", "New description", "http://image.url", List.of());
        RecipeEntity entity = new RecipeEntity(id, "Pizza", "New description", "http://image.url", List.of());
        when(repository.findById(id)).thenReturn(Optional.of(entity));
        when(mapper.domainToEntity(recipe)).thenReturn(entity);
        when(repository.save(entity)).thenReturn(entity);
        when(mapper.entityToDomain(entity)).thenReturn(recipe);

        Optional<Recipe> result = service.updateRecipe(id, recipe);

        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(id);
    }

    @Test
    void updateRecipe_unknownId_returnsEmpty() {
        UUID id = UUID.randomUUID();
        when(repository.findById(id)).thenReturn(Optional.empty());

        Optional<Recipe> result = service.updateRecipe(id, new Recipe());

        assertThat(result).isEmpty();
        verify(repository, never()).save(any());
    }
}
