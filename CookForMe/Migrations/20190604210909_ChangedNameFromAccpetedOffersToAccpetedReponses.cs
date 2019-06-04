using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CookForMe.Migrations
{
    public partial class ChangedNameFromAccpetedOffersToAccpetedReponses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AcceptedOffers");

            migrationBuilder.CreateTable(
                name: "AcceptedResponses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CallerId = table.Column<string>(nullable: true),
                    ChosenResponseId = table.Column<int>(nullable: false),
                    ChosenOfferId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AcceptedResponses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AcceptedResponses_AspNetUsers_CallerId",
                        column: x => x.CallerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AcceptedResponses_Offers_ChosenOfferId",
                        column: x => x.ChosenOfferId,
                        principalTable: "Offers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AcceptedResponses_Responses_ChosenResponseId",
                        column: x => x.ChosenResponseId,
                        principalTable: "Responses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AcceptedResponses_CallerId",
                table: "AcceptedResponses",
                column: "CallerId");

            migrationBuilder.CreateIndex(
                name: "IX_AcceptedResponses_ChosenOfferId",
                table: "AcceptedResponses",
                column: "ChosenOfferId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AcceptedResponses_ChosenResponseId",
                table: "AcceptedResponses",
                column: "ChosenResponseId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AcceptedResponses");

            migrationBuilder.CreateTable(
                name: "AcceptedOffers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CallerId = table.Column<string>(nullable: true),
                    ChosenOfferId = table.Column<int>(nullable: false),
                    ChosenResponseId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AcceptedOffers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AcceptedOffers_AspNetUsers_CallerId",
                        column: x => x.CallerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AcceptedOffers_Offers_ChosenOfferId",
                        column: x => x.ChosenOfferId,
                        principalTable: "Offers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AcceptedOffers_Responses_ChosenResponseId",
                        column: x => x.ChosenResponseId,
                        principalTable: "Responses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AcceptedOffers_CallerId",
                table: "AcceptedOffers",
                column: "CallerId");

            migrationBuilder.CreateIndex(
                name: "IX_AcceptedOffers_ChosenOfferId",
                table: "AcceptedOffers",
                column: "ChosenOfferId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AcceptedOffers_ChosenResponseId",
                table: "AcceptedOffers",
                column: "ChosenResponseId",
                unique: true);
        }
    }
}
