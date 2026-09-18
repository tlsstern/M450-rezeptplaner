package ch.tbz.recipe.planner.domain;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Recipe {

    private UUID id;
    @NotBlank
    private String name;
    private String description;
    private String imageUrl;
    private List<@Valid Ingredient> ingredients;
}
