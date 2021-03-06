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

        [HttpGet("login/{userName}/{password}")]
        [ActionName("Login")]
        public async Task<ActionResult<User>> Login(String userName, String password)
        {
            sqlCmd.CommandText = "SELECT * FROM [COMMON].[User]";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();
            
            User user = null;
            while (reader.Read())
            {
                if(userName == (String)reader.GetValue(1) && password == (String)reader.GetValue(3)){
                    user = new User();
                    user.UserId = (Guid)reader.GetValue(0);
                    user.Name = (String)reader.GetValue(1);
                    user.eMail = (String)reader.GetValue(2);
                    user.password = (String)reader.GetValue(3);
                }
                    
            }
            return user;

            myConnection.Close();
        }

        [HttpGet("get-users")]
        [ActionName("GetUser")]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            sqlCmd.CommandText = "SELECT * FROM [COMMON].[User]";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            List<User> usersList = new List<User>();
            User user = null;
            while (reader.Read())
            {
                user = new User();
                user.UserId = (Guid)reader.GetValue(0);
                user.Name = (String)reader.GetValue(1);
                user.eMail = (String)reader.GetValue(2);
                user.password = (String)reader.GetValue(3);
                usersList.Add(user);
            }
            return usersList;

            myConnection.Close();
        }

        [HttpGet("get-boards-with-user-id/{userId}")]
        [ActionName("GetBoardsByUserID")]
        public async Task<ActionResult<IEnumerable<Board>>> GetBoardsByUserID(Guid userId)
        {
            sqlCmd.CommandText = "SELECT * FROM [CONTENT MANAGEMENT].[BOARD]";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            List<Board> boardList = new List<Board>();
            Board board = null;
            while (reader.Read())
            {
                if(userId == (Guid)reader.GetValue(2)){
                    board = new Board();
                    board.BoardId = (Guid)reader.GetValue(0);
                    board.Name = (String)reader.GetValue(1);
                    board.OwnerId = (Guid)reader.GetValue(2);
                    boardList.Add(board);
                }
            }
            return boardList;

            myConnection.Close();
        }


        [HttpGet("get-cards-with-board-id/{boardId}")]
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

        [HttpGet("search-card/{title}/{userId}")]
        [ActionName("SearchCard")]
        public async Task<ActionResult<IEnumerable<Card>>> SearchCardWithTitle(String title, String userId)
        {
            sqlCmd.CommandText = "SELECT CardId, Title, Description, a.BoardId, Deadline, CreatedAt FROM [CONTENT MANAGEMENT].[CARD] as a INNER JOIN [CONTENT MANAGEMENT].[BOARD] as b ON a.BoardId = b.BoardId WHERE Title = @Title AND b.OwnerId = @UserId";
            sqlCmd.Connection = myConnection;
            sqlCmd.Parameters.Add(new SqlParameter("@Title", title));
            sqlCmd.Parameters.Add(new SqlParameter("@UserId", userId));
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            List<Card> cardList = new List<Card>();
            Card card = null;
            while (reader.Read())
            {
                if(title == (String)reader.GetValue(1)){
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

        [HttpGet("search-cards/{deadlineBegin}/{deadlineEnd}/{userId}")]
        [ActionName("SearchCards")]
        public async Task<ActionResult<IEnumerable<Card>>> SearchCardWithDate(String deadlineBegin, String deadlineEnd, String userId) 
        {
            DateTime beginDateT = Convert.ToDateTime(deadlineBegin);
            DateTime endDateT = Convert.ToDateTime(deadlineEnd);

            sqlCmd.CommandText = "SELECT CardId, Title, Description, a.BoardId, Deadline, CreatedAt FROM [CONTENT MANAGEMENT].[CARD] as a INNER JOIN [CONTENT MANAGEMENT].[BOARD] as b ON a.BoardId = b.BoardId WHERE b.OwnerId = @UserId";
             //   "WHERE " + beginDateT + " <= Deadline";
            //    "WHERE " + beginDateT + " <= Deadline AND " + endDateT + " >= Deadline";
              sqlCmd.Connection = myConnection;
              sqlCmd.Parameters.Add(new SqlParameter("@UserId", userId));
              myConnection.Open();
              reader = sqlCmd.ExecuteReader();


            List <Card> cardList = new List<Card>();
            Card card = null;
            while (reader.Read())
            {
                if (beginDateT <= (DateTime)reader.GetValue(4)  && endDateT >= (DateTime)reader.GetValue(4))
               {
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

         //   myConnection.Close();
        }

        [HttpPost("create-card-without-id/{cardTitle}/{description}/{deadline}/{boardId}")]
        [ActionName("CreateCard")]
        public async void CreateCardWithoutId(String cardTitle, String description, String deadline, String boardId)
        {
            DateTime deadlineTime = Convert.ToDateTime(deadline);

            sqlCmd.CommandText = "INSERT INTO [CONTENT MANAGEMENT].[CARD] VALUES(@CardId, @Title, @Description, @BoardId, @Deadline, @CreatedAt)";
            sqlCmd.Connection = myConnection;

            sqlCmd.Parameters.Add(new SqlParameter("@CardId", Guid.NewGuid()));
            sqlCmd.Parameters.Add(new SqlParameter("@Title", cardTitle));
            sqlCmd.Parameters.Add(new SqlParameter("@Description", description));
            sqlCmd.Parameters.Add(new SqlParameter("@BoardId", boardId));
            sqlCmd.Parameters.Add(new SqlParameter("@Deadline", deadlineTime));
            sqlCmd.Parameters.Add(new SqlParameter("@CreatedAt", DateTime.Now));


            try
            {
                myConnection.Open();
                sqlCmd.ExecuteNonQuery();
                Console.WriteLine("Records Inserted Successfully");
            }
            catch (SqlException e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }
            finally
            {
                myConnection.Close();
            }
        }

        [HttpPost("create-board/{boardName}/{ownerId}")]
        [ActionName("CreateBoardWithUserId")]
        public async void CreateBoardWithUserId(String boardName, Guid ownerId)
        {
            sqlCmd.CommandText = "INSERT INTO [CONTENT MANAGEMENT].[BOARD] VALUES(@BoardId, @Name, @OwnerId)";
            sqlCmd.Connection = myConnection;

            sqlCmd.Parameters.Add(new SqlParameter("@BoardId", Guid.NewGuid()));
            sqlCmd.Parameters.Add(new SqlParameter("@Name", boardName));
            sqlCmd.Parameters.Add(new SqlParameter("@OwnerId", ownerId));


            try
            {
                myConnection.Open();
                sqlCmd.ExecuteNonQuery();
                Console.WriteLine("Records Inserted Successfully");
            }
            catch (SqlException e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }
            finally
            {
                myConnection.Close();
            }
        }

        [HttpPut("update-card-with-parameters/{cardTitle}/{description}/{deadline}/{cardId}")]
        [ActionName("UpdateCard")]
        public async void UpdateCardWithParameters(String cardTitle, String description, String deadline, String cardId )
        {
            DateTime deadlineTime = Convert.ToDateTime(deadline);

            sqlCmd.CommandText = "UPDATE [CONTENT MANAGEMENT].[CARD] SET Title = @Title, Description = @Description, Deadline = @Deadline WHERE CardId = @CardId";
            sqlCmd.Connection = myConnection;

            sqlCmd.Parameters.Add(new SqlParameter("@Title", cardTitle));
            sqlCmd.Parameters.Add(new SqlParameter("@Description", description));
            sqlCmd.Parameters.Add(new SqlParameter("@Deadline", deadlineTime));
            sqlCmd.Parameters.Add(new SqlParameter("@CardId", cardId));

            try
            {
                myConnection.Open();
                sqlCmd.ExecuteNonQuery();
                Console.WriteLine("Records Updated Successfully");
            }
            catch (SqlException e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }
            finally
            {
                myConnection.Close();
            }
        }

        [HttpDelete("delete-board/{boardId}")]
        [ActionName("DeleteBoard")]
        public async void DeleteBoard(Guid boardId)
        {
            sqlCmd.CommandText = "DELETE FROM [CONTENT MANAGEMENT].[BOARD] WHERE BoardId = " +  "'" + boardId + "'";
            sqlCmd.Connection = myConnection;
            
            sqlCmd.Parameters.Add(new SqlParameter("@BoardId", boardId));

            try
            {
                myConnection.Open();
                sqlCmd.ExecuteNonQuery();
                Console.WriteLine("Records Deleted Successfully");
            }
            catch (SqlException e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }
            finally
            {
                myConnection.Close();
            }
        }

        [HttpDelete("delete-card-with-card-id/{cardId}")]
        [ActionName("DeleteCardWithCardId")]
        public async void DeleteCardWithCardId(Guid cardId)
        {
            sqlCmd.CommandText = "DELETE FROM [CONTENT MANAGEMENT].[CARD] WHERE CardId = @CardId";
            sqlCmd.Connection = myConnection;
            
            sqlCmd.Parameters.Add(new SqlParameter("@CardId", cardId));

            try
            {
                myConnection.Open();
                sqlCmd.ExecuteNonQuery();
                Console.WriteLine("Records Deleted Successfully");
            }
            catch (SqlException e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }
            finally
            {
                myConnection.Close();
            }
        }

        [HttpDelete("delete-card-with-board-id/{boardId}")]
        [ActionName("DeleteCardWithBoardId")]
        public async void DeleteCardWithBoardId(Guid boardId)
        {
            sqlCmd.CommandText = "DELETE FROM [CONTENT MANAGEMENT].[CARD] WHERE BoardId = @BoardId";
            sqlCmd.Connection = myConnection;

            sqlCmd.Parameters.Add(new SqlParameter("@BoardId", boardId));

            try
            {
                myConnection.Open();
                sqlCmd.ExecuteNonQuery();
                Console.WriteLine("Records Deleted Successfully");
            }
            catch (SqlException e)
            {
                Console.WriteLine("Error Generated. Details: " + e.ToString());
            }
            finally
            {
                myConnection.Close();
            }
        }

        
        
    }
}