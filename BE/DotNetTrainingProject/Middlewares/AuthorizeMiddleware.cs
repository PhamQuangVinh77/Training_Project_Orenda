using System.Text.Json;
using DotNetTrainingProject.Models.Responses;
using MySqlX.XDevAPI.Common;

namespace DotNetTrainingProject.Middlewares
{
    public class AuthorizeMiddleware
    {
        private readonly RequestDelegate _next;
        public AuthorizeMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            // Gọi tiếp middleware tiếp theo trong pipeline
            await _next(context);

            // Can thiệp vào response sau khi các middleware trước đã xử lý
            if (context.Response.StatusCode == StatusCodes.Status403Forbidden)
            {
                var response = new Response { Status = "Error", Message = "Only Admin can use this feature!" };
                var responseJson = JsonSerializer.Serialize(response);
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(responseJson);
            }
            else if (context.Response.StatusCode == StatusCodes.Status401Unauthorized)
            {
                var response = new Response { Status = "Error", Message = "You need to login to use this feature!" };
                var responseJson = JsonSerializer.Serialize(response);
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(responseJson);
            }
        }

    }
}
