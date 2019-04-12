import * as  RecipeActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as fromApp from '../../store/app.reducers'


export interface FeatureState extends fromApp.AppState {
  recipes: State
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      'A Healthy Salad',
      'Yummi with fresh vegies',
      'https://img.taste.com.au/EU9D0DbT/w720-h480-cfill-q80/taste/2016/11/ripper-thai-beef-noodle-salad-62642-1.jpeg',
      [
        new Ingredient('Tomatoes', 1),
        new Ingredient('Cucumbers', 20)
      ]
    ),
    new Recipe(
      'Delicious Tastey Momos',
      'One of my favourite momos',
      'https://smedia2.intoday.in/aajtak/images/stories/102015/vegmomos-pakwangali_520_100115031219.jpg',
      []
    )
  ]
}
export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case (RecipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      }
    case (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }
    case (RecipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      }
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe
      return {
        ...state,
        recipes: recipes
      }
    case (RecipeActions.DELETE_RECIPE):
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      }
    default:
      return state
  }
}
