using ContentsLimit.Pocos;
using Microsoft.EntityFrameworkCore;

namespace ContentsLimit.Dal
{

    // -------------------------------------------
    /// <summary>
    /// Dal service (data access layer) manages our connection to the database.
    /// It is used to select, update, insert, and delete using entity framework.
    /// </summary>
    public class DalService : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=contentslimit.db");
        }

        public DbSet<ContentLimitItemPoco> ContentLimitItems { get; set; }
        
    }
}
