package ch.tbz.recipe.planner.mapper;

import ch.tbz.recipe.planner.domain.Ingredient;
import ch.tbz.recipe.planner.domain.Unit;
import ch.tbz.recipe.planner.entities.IngredientEntity;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.util.UUID;

class IngredientEntityMapperTest {

    private final IngredientEntityMapper mapper = Mappers.getMapper(IngredientEntityMapper.class);

    @Test
    void entityToDomain_mapsAllFields() {
        UUID id = UUID.randomUUID();
        IngredientEntity entity = new IngredientEntity(id, "Tomato", "The big ones", Unit.PIECE, 5);

        Ingredient ingredient = mapper.entityToDomain(entity);

        SoftAssertions softly = new SoftAssertions();
        softly.assertThat(ingredient.getId()).isEqualTo(id);
        softly.assertThat(ingredient.getName()).isEqualTo("Tomato");
        softly.assertThat(ingredient.getComment()).isEqualTo("The big ones");
        softly.assertThat(ingredient.getUnit()).isEqualTo(Unit.PIECE);
        softly.assertThat(ingredient.getAmount()).isEqualTo(5);
        softly.assertAll();
    }

    @Test
    void domainToEntity_mapsAllFields() {
        UUID id = UUID.randomUUID();
        Ingredient ingredient = new Ingredient(id, "Flour", null, Unit.GRAMM, 250);

        IngredientEntity entity = mapper.domainToEntity(ingredient);

        SoftAssertions softly = new SoftAssertions();
        softly.assertThat(entity.getId()).isEqualTo(id);
        softly.assertThat(entity.getName()).isEqualTo("Flour");
        softly.assertThat(entity.getComment()).isNull();
        softly.assertThat(entity.getUnit()).isEqualTo(Unit.GRAMM);
        softly.assertThat(entity.getAmount()).isEqualTo(250);
        softly.assertAll();
    }
}
