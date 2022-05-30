using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using TaskManagementWebApi.Models;

namespace TaskManagementWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskManagementController : ControllerBase
    {
        SqlDataReader reader = null;
        SqlConnection myConnection = new SqlConnection();
        SqlCommand sqlCmd = new SqlCommand();

        public TaskManagementController(){
            myConnection.ConnectionString = @"Data Source = localhost; Initial Catalog = TaskManagementdb; Persist Security Info=True; User ID = sa; Password = yourStrong**Password;Encrypt=False";
            sqlCmd.CommandType = CommandType.Text;
        }

        [HttpGet]
        [ActionName("GetUser")]
        public async Task<ActionResult<User>> Get()
        {
            sqlCmd.CommandText = "SELECT * FROM [COMMON].[User]";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            User user = null;
            while (reader.Read())
            {
                user = new User();
                user.UserId = (Guid)reader.GetValue(0);
                user.Name = (String)reader.GetValue(1);
                user.eMail = (String)reader.GetValue(2);
                user.password = (String)reader.GetValue(3);

            }
            return user;

            myConnection.Close();
        }

        [HttpGet("/users/{userId}")]
        [ActionName("GetBoardByUserID")]
        public async Task<ActionResult<Board>> GetBoardByUserID(Guid userId)
        {
            sqlCmd.CommandText = "SELECT * FROM [CONTENT MANAGEMENT].[BOARD]";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            Board board = null;
            while (reader.Read())
            {
                if(userId == (Guid)reader.GetValue(2)){
                    board = new Board();
                    board.BoardId = (Guid)reader.GetValue(0);
                    board.Name = (String)reader.GetValue(1);
                    board.OwnerId = (Guid)reader.GetValue(2);
                }
            }
            return board;

            myConnection.Close();
        }


        [HttpGet("board/{boardId}")]
        [ActionName("GetCardsByBoardID")]
        public async Task<ActionResult<IEnumerable<Card>>> GetCardsByBoardID(Guid boardId)
        {
            sqlCmd.CommandText = "SELECT * FROM [CONTENT MANAGEMENT].[CARD]";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            List<Card> cardList = new List<Card>();
            Card card = null;
            while (reader.Read())
            {
                if(boardId == (Guid)reader.GetValue(3)){
                    card = new Card();
                    card.CardId = (Guid)reader.GetValue(0);
                    card.Title = (String)reader.GetValue(1);
                    card.Description = (String)reader.GetValue(2);
                    card.BoardId = (Guid)reader.GetValue(3);
                    card.Deadline = (DateTime)reader.GetValue(4);
                    card.CreatedAt = (DateTime)reader.GetValue(5);
                    cardList.Add(card);
                }
            }
            return cardList;

            myConnection.Close();
        }



    }
}