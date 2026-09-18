package ch.tbz.recipe.planner.domain;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Ingredient {

    private UUID id;
    @NotBlank
    private String name;
    private String comment;
    private Unit unit;
    @Min(1)
    private int amount;

}
