package tacos;

import lombok.Data;

import java.util.List;
// TODO: 非空验证
@Data
public class Taco {

    private String name;

    private List<Ingredient> ingredients;
}
