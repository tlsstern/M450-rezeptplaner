package ch.tbz.recipe.planner.mapper;

import ch.tbz.recipe.planner.domain.Ingredient;
import ch.tbz.recipe.planner.domain.Recipe;
import ch.tbz.recipe.planner.domain.Unit;
import ch.tbz.recipe.planner.entities.IngredientEntity;
import ch.tbz.recipe.planner.entities.RecipeEntity;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.UUID;

class RecipeEntityMapperTest {

    private final RecipeEntityMapper mapper = Mappers.getMapper(RecipeEntityMapper.class);

    @Test
    void entityToDomain_mapsAllFields() {
        UUID id = UUID.randomUUID();
        IngredientEntity tomato = new IngredientEntity(UUID.randomUUID(), "Tomato", "The big ones", Unit.PIECE, 5);
        RecipeEntity entity = new RecipeEntity(id, "Lasagne", "Some description", "http://image.url", List.of(tomato));

        Recipe recipe = mapper.entityToDomain(entity);

        SoftAssertions softly = new SoftAssertions();
        softly.assertThat(recipe.getId()).isEqualTo(id);
        softly.assertThat(recipe.getName()).isEqualTo("Lasagne");
        softly.assertThat(recipe.getDescription()).isEqualTo("Some description");
        softly.assertThat(recipe.getImageUrl()).isEqualTo("http://image.url");
        softly.assertThat(recipe.getIngredients()).hasSize(1);
        softly.assertThat(recipe.getIngredients().get(0).getName()).isEqualTo("Tomato");
        softly.assertAll();
    }

    @Test
    void domainToEntity_mapsAllFields() {
        UUID id = UUID.randomUUID();
        Ingredient tomato = new Ingredient(UUID.randomUUID(), "Tomato", "The big ones", Unit.PIECE, 5);
        Recipe recipe = new Recipe(id, "Lasagne", "Some description", "http://image.url", List.of(tomato));

        RecipeEntity entity = mapper.domainToEntity(recipe);

        SoftAssertions softly = new SoftAssertions();
        softly.assertThat(entity.getId()).isEqualTo(id);
        softly.assertThat(entity.getName()).isEqualTo("Lasagne");
        softly.assertThat(entity.getDescription()).isEqualTo("Some description");
        softly.assertThat(entity.getImageUrl()).isEqualTo("http://image.url");
        softly.assertThat(entity.getIngredients()).hasSize(1);
        softly.assertThat(entity.getIngredients().get(0).getName()).isEqualTo("Tomato");
        softly.assertAll();
    }
}
