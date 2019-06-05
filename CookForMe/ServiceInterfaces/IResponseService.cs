using System.Collections.Generic;
using CookForMe.Models;
using CookForMe.Models.DTO;
using CookForMe.Models.FormModels;

namespace CookForMe.ServiceInterfaces
{
    public interface IResponseService
    {
        void Create(Response newResponse);
        void EditResponse(EditResponseFormData formData);
        ShortResponseDTO GetResponse(int responseId);
        IEnumerable<ShortResponseDTO> GetResponsesOfSpecificOrder(int orderid);
        IEnumerable<ResponseDTO> GetUserResponses(string id);
        void AcceptResponse(AcceptedResponseFormData formData);
        IEnumerable<AcceptedResponseDTO> GetAcceptedResponses(string userId);
        AcceptedResponseDTO GetAcceptedResponse(int responseId);
    }
}