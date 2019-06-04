using Microsoft.EntityFrameworkCore.Migrations;

namespace CookForMe.Migrations
{
    public partial class AddOrderIdColumnInAccpetedOffersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ChosenOrderId",
                table: "AcceptedResponses",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AcceptedResponses_ChosenOrderId",
                table: "AcceptedResponses",
                column: "ChosenOrderId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AcceptedResponses_Orders_ChosenOrderId",
                table: "AcceptedResponses",
                column: "ChosenOrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AcceptedResponses_Orders_ChosenOrderId",
                table: "AcceptedResponses");

            migrationBuilder.DropIndex(
                name: "IX_AcceptedResponses_ChosenOrderId",
                table: "AcceptedResponses");

            migrationBuilder.DropColumn(
                name: "ChosenOrderId",
                table: "AcceptedResponses");
        }
    }
}
