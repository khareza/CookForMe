using AutoMapper;
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
        private readonly IMapper _mapper;

        public ResponseService(AuthenticationContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<ShortResponseDTO> GetResponsesOfSpecificOrder(int orderid)
        {
            var responses = _context.Responses.Include(r => r.Recipes).Where(x => x.OrderId == orderid);

            if (responses != null)
            {
                foreach (var item in responses)
                {
                    var responseDto = _mapper.Map<ShortResponseDTO>(item);
                    responseDto.Recipes = new List<RecipeDTO>();
                    foreach (var recipe in item.Recipes)
                    {
                        responseDto.Recipes.Add(_mapper.Map<RecipeDTO>(recipe));
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
                var responseDto = _mapper.Map<ResponseDTO>(item);
                responseDto.Recipes = new List<RecipeDTO>();

                foreach (var recipe in item.Recipes)
                {
                    responseDto.Recipes.Add(_mapper.Map<RecipeDTO>(recipe));
                }
                yield return responseDto;
            }
        }

        public ShortResponseDTO GetResponse(int responseId)
        {
            var response = _context.Responses.Include(r => r.Recipes).Where(x => x.Id == responseId).FirstOrDefault();
            if (response != null)
            {
                var responseDto = _mapper.Map<ShortResponseDTO>(response);
                responseDto.Recipes = new List<RecipeDTO>();
                foreach (var recipe in response.Recipes)
                {
                    responseDto.Recipes.Add(_mapper.Map<RecipeDTO>(recipe));
                }
                return responseDto;
            }
            else
            {
                return null;
            }
            
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
