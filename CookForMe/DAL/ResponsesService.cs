using CookForMe.Models;
using CookForMe.Models.DTO;
using CookForMe.Models.FormModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.DAL
{
    public class ResponseService
    {
        private AuthenticationContext _context;

        public ResponseService(AuthenticationContext context)
        {
            _context = context;
        }

        public IEnumerable<ShortResponseDTO> GetResponsesOfSpecificOrder(int id)
        {
            var responses = _context.Responses.Include(r => r.Recipes).Where(x => x.OrderId == id);
            if (responses != null)
            {
                foreach (var item in responses)
                {
                    ShortResponseDTO responseDto = new ShortResponseDTO();
                    responseDto.ResponseId = item.Id;
                    responseDto.ResponseStatus = item.ResponseStatus.ToString();
                    responseDto.Recipes = new List<RecipeDTO>();
                    foreach (var recipe in item.Recipes)
                    {
                        responseDto.Recipes.Add(new RecipeDTO { Name = recipe.Name, Price = recipe.Price, AvgCookTime = recipe.AvgCookTime });
                    }
                    yield return responseDto;
                }
            }
        }

        public IEnumerable<ResponseDTO> GetUserResponses(string id)
        {
            var responses = _context.Responses.Include(x => x.Recipes).Include(x => x.Order).Where(x => x.Responser.Id == id);
            foreach (var item in responses)
            {
                ResponseDTO responseDto = new ResponseDTO();
                responseDto.ResponseId = item.Id;
                responseDto.OrderId = item.OrderId;
                responseDto.OrderCreationDate = item.Order.CreationDate;
                responseDto.OrderDeadline = item.Order.Deadline;
                responseDto.OrderIngredientsPhotoUrl = item.Order.IngredientsPhotoUrl;
                responseDto.OrderIngredientsAvaiableList = item.Order.IngredientsAvaiableList;
                responseDto.OrderDescription = item.Order.Description;
                responseDto.ResponseStatus = item.ResponseStatus.ToString();
                responseDto.Recipes = new List<RecipeDTO>();
                foreach (var recipe in item.Recipes)
                {
                    responseDto.Recipes.Add(new RecipeDTO { Name = recipe.Name, Price = recipe.Price, AvgCookTime = recipe.AvgCookTime });
                }
                yield return responseDto;
            }
        }

        public ShortResponseDTO GetResponse(int id)
        {
            ShortResponseDTO responseDto = new ShortResponseDTO();
            var response = _context.Responses.Include(r => r.Recipes).Where(x => x.Id == id).FirstOrDefault();
            if (response != null)
            {
                responseDto.ResponseId = response.Id;
                responseDto.Recipes = new List<RecipeDTO>();
                foreach (var recipe in response.Recipes)
                {
                    responseDto.Recipes.Add(new RecipeDTO { Id = recipe.Id, Name = recipe.Name, Price = recipe.Price, AvgCookTime = recipe.AvgCookTime });
                }
            }
            return responseDto;
        }

        public Response EditResponse(EditResponseFormData formData)
        {
            var response = _context.Responses.Include(r=>r.Recipes).FirstOrDefault(r=>r.Id == formData.Id);
            if (response!=null)
            {
                foreach (var recipe in response.Recipes)
                {
                    var recipeForm = formData.Recipes.FirstOrDefault(x => x.Id == recipe.Id);
                    recipe.Name = recipeForm.Name;
                    recipe.Price = recipeForm.Price;
                    recipe.AvgCookTime = recipeForm.AvgCookTime;
                }
                _context.SaveChanges();
                return response;
            }
            else
            {
                return null;
            }

        }

        public void Create(Response newResponse)
        {
            _context.Responses.Add(newResponse);
            _context.SaveChanges();
        }

    }
}
