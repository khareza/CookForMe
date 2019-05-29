using Microsoft.EntityFrameworkCore.Migrations;

namespace CookForMe.Migrations
{
    public partial class ChangeRealtionBetweenResponsesAndRecipes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_FounderId1",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Responses_ResponseId",
                table: "Recipes");

            migrationBuilder.DropForeignKey(
                name: "FK_Responses_AspNetUsers_ResponserId1",
                table: "Responses");

            migrationBuilder.DropIndex(
                name: "IX_Responses_ResponserId1",
                table: "Responses");

            migrationBuilder.DropIndex(
                name: "IX_Orders_FounderId1",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ResponserId1",
                table: "Responses");

            migrationBuilder.DropColumn(
                name: "FounderId1",
                table: "Orders");

            migrationBuilder.AlterColumn<string>(
                name: "ResponserId",
                table: "Responses",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ResponseId",
                table: "Recipes",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "FounderId",
                table: "Orders",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_Responses_ResponserId",
                table: "Responses",
                column: "ResponserId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_FounderId",
                table: "Orders",
                column: "FounderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_FounderId",
                table: "Orders",
                column: "FounderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Responses_ResponseId",
                table: "Recipes",
                column: "ResponseId",
                principalTable: "Responses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Responses_AspNetUsers_ResponserId",
                table: "Responses",
                column: "ResponserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_FounderId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Responses_ResponseId",
                table: "Recipes");

            migrationBuilder.DropForeignKey(
                name: "FK_Responses_AspNetUsers_ResponserId",
                table: "Responses");

            migrationBuilder.DropIndex(
                name: "IX_Responses_ResponserId",
                table: "Responses");

            migrationBuilder.DropIndex(
                name: "IX_Orders_FounderId",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "ResponserId",
                table: "Responses",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ResponserId1",
                table: "Responses",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ResponseId",
                table: "Recipes",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FounderId",
                table: "Orders",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FounderId1",
                table: "Orders",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Responses_ResponserId1",
                table: "Responses",
                column: "ResponserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_FounderId1",
                table: "Orders",
                column: "FounderId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_FounderId1",
                table: "Orders",
                column: "FounderId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Responses_ResponseId",
                table: "Recipes",
                column: "ResponseId",
                principalTable: "Responses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Responses_AspNetUsers_ResponserId1",
                table: "Responses",
                column: "ResponserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
