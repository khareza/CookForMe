using Microsoft.EntityFrameworkCore.Migrations;

namespace CookForMe.Migrations
{
    public partial class RemovedRatingFromAppUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "AspNetUsers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Rating",
                table: "AspNetUsers",
                type: "decimal(18, 2)",
                nullable: true);
        }
    }
}
