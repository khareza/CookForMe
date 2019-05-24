using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CookForMe.Migrations
{
    public partial class ChangedOrderPhotoColumnType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IngredientsPhoto",
                table: "Orders");

            migrationBuilder.AddColumn<string>(
                name: "IngredientsPhotoUrl",
                table: "Orders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IngredientsPhotoUrl",
                table: "Orders");

            migrationBuilder.AddColumn<byte[]>(
                name: "IngredientsPhoto",
                table: "Orders",
                nullable: true);
        }
    }
}
