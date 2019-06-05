using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CookForMe.Migrations
{
    public partial class CreateRatingsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "Rating",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserRatingId = table.Column<string>(nullable: true),
                    UserRatedId = table.Column<string>(nullable: true),
                    Rate = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rating", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rating_AspNetUsers_UserRatedId",
                        column: x => x.UserRatedId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Rating_AspNetUsers_UserRatingId",
                        column: x => x.UserRatingId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rating_UserRatedId",
                table: "Rating",
                column: "UserRatedId");

            migrationBuilder.CreateIndex(
                name: "IX_Rating_UserRatingId",
                table: "Rating",
                column: "UserRatingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rating");

            migrationBuilder.AddColumn<decimal>(
                name: "Rating",
                table: "AspNetUsers",
                type: "decimal(5, 2)",
                nullable: true);
        }
    }
}
