// Component: OutfitSuggestion
// Author: Run Liu
// Description: Displays outfit suggestion based on user information and weather
import styled from "styled-components";
import type { User } from "../interfaces/User";
import type { Weather } from "../interfaces/Weather";
import type { ReactNode } from "react";
// Container for the outfit suggestion card

const OutfitContainer = styled.section`
  width: 85vw;
  max-width: 1100px;
    margin-top: 2vh;
  margin-bottom: 4vh;
  padding: 3vh 4vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: cursive, "Arial";
  font-size: calc(0.9vw + 0.8vh);
  background-color: rgba(50, 69, 105, 0.36);
  border-radius: 2vh;
  box-shadow: 0 0 2vh rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  color:#1C1C1E;
`;

const OutfitTitle = styled.h2`
  width: 100%;
  text-align: center;               /* center heading like other cards */
  margin: 0 0 2vh;
  font-size: calc(1.3vw + 1.2vh);
  color: #111827;
`;

const OutfitParagraph = styled.p`
  margin: 1vh 0;
`;

const OutfitList = styled.ul`
  margin: 1vh 0 1.5vh 2vw;          /* small indent for bullets */
`;

type OutfitSuggestionProps = {
    user: User | null;
    weather: Weather | null;
};
// Builds an outfit recommendation based on user preferences and current weather

function OutfitSuggestion({ user, weather }: OutfitSuggestionProps) {
    let content: ReactNode;

    // 1) Missing user
    if (!user) {
        content = (
            <OutfitParagraph>
                Fill out the form first to get a suggestion.
            </OutfitParagraph>
        );
    }
    // 2) Missing weather
    else if (!weather) {
        content = (
            <OutfitParagraph>
                We still need the weather. Submit the form if needed.
            </OutfitParagraph>
        );
    } else {
        // We have both user and weather, so we can do full logic
        const { preferences, age, gender } = user;
        const temp = weather.temperature_2m;
        const rain = weather.rain;

        // --- 0. Validate age and preferences before doing any work ---
        const numericAge = Number(age);
        const ageInvalid =
            Number.isNaN(numericAge) || numericAge <= 1 || numericAge >= 100;

        const hasAnyPreference =
            preferences.top ||
            preferences.bottom ||
            preferences.shoe ||
            preferences.hat;

        if (ageInvalid) {
            content = (
                <OutfitParagraph>
                    The age you entered is not valid. Please enter an age between 1 and
                    100 to get an outfit suggestion.
                </OutfitParagraph>
            );
        } else if (!hasAnyPreference) {
            content = (
                <OutfitParagraph>
                    You did not select any clothing items. Please choose at least one
                    (top, bottom, shoes, or hat) to get a suggestion.
                </OutfitParagraph>
            );
        } else {
            // --- 1. Classify temperature into categories ---
            let tempLabel: "freezing" | "cold" | "cool" | "mild" | "warm" | "hot";
            if (temp <= -5) tempLabel = "freezing";
            else if (temp <= 5) tempLabel = "cold";
            else if (temp <= 12) tempLabel = "cool";
            else if (temp <= 18) tempLabel = "mild";
            else if (temp <= 25) tempLabel = "warm";
            else tempLabel = "hot";

            // --- 2. Decide specific items for each category ---
            let topItem = "";
            if (preferences.top) {
                if (tempLabel === "freezing" || tempLabel === "cold") {
                    topItem = "a heavy coat or thick hoodie";
                } else if (tempLabel === "cool" || tempLabel === "mild") {
                    topItem = "a sweater or light jacket";
                } else if (tempLabel === "warm") {
                    topItem = "a T-shirt or light long-sleeve top";
                } else {
                    topItem = "a loose, breathable T-shirt or tank top";
                }
            }

            let bottomItem = "";
            if (preferences.bottom) {
                if (tempLabel === "freezing" || tempLabel === "cold") {
                    bottomItem = "thick pants or lined joggers";
                } else if (tempLabel === "cool" || tempLabel === "mild") {
                    bottomItem = "jeans or regular pants";
                } else if (tempLabel === "warm") {
                    bottomItem = "lightweight pants or chinos";
                } else {
                    bottomItem = "light shorts or breathable joggers";
                }
            }

            let shoeItem = "";
            if (preferences.shoe) {
                if (rain > 0) {
                    shoeItem = "waterproof sneakers or boots";
                } else if (tempLabel === "freezing" || tempLabel === "cold") {
                    shoeItem = "warm sneakers or boots";
                } else {
                    shoeItem = "comfortable everyday sneakers";
                }
            }

            let hatItem = "";
            if (preferences.hat) {
                if (rain > 0) {
                    hatItem = "a waterproof cap or hood";
                } else if (tempLabel === "freezing" || tempLabel === "cold") {
                    hatItem = "a warm beanie";
                } else if (tempLabel === "hot") {
                    hatItem = "a light cap to block the sun";
                } else {
                    hatItem = "a simple cap or beanie, depending on your style";
                }
            }

            // --- 3. Add age & gender context ---
            let ageComment = "";
            if (numericAge < 18) {
                ageComment =
                    "Since you're on the younger side, a relaxed and comfortable outfit is perfect for school or going out.";
            } else if (numericAge < 30) {
                ageComment = "For your age, a casual everyday style works really well.";
            } else {
                ageComment =
                    "A simple, classic combination will look good and keep you comfortable.";
            }

            let genderComment = "";
            if (gender) {
                if (
                    gender.toLowerCase() === "male" ||
                    gender.toLowerCase() === "female"
                ) {
                    genderComment = `These pieces are unisex, so you can adapt them to your own ${gender.toLowerCase()} style.`;
                } else {
                    genderComment =
                        "These pieces are unisex, so you can adapt them to your own style.";
                }
            }

            // --- 4. Build final text ---
            let baseTempText = "";
            if (tempLabel === "freezing") {
                baseTempText = "It's extremely cold outside. You need heavy layers.";
            } else if (tempLabel === "cold") {
                baseTempText = "It's very cold. You should wear warm layers.";
            } else if (tempLabel === "cool") {
                baseTempText =
                    "It's cool out. A bit of layering will keep you comfortable.";
            } else if (tempLabel === "mild") {
                baseTempText =
                    "The temperature is mild, so medium-weight clothing is fine.";
            } else if (tempLabel === "warm") {
                baseTempText = "It's warm, so lighter clothing will be comfortable.";
            } else {
                baseTempText =
                    "It's hot, so go for the lightest and most breathable pieces.";
            }

            let rainText = "";
            if (rain > 0) {
                rainText =
                    "There is some rain, so prioritize items that can handle getting wet.";
            }

            const itemLines: string[] = [];
            if (topItem) itemLines.push(`Top: ${topItem}.`);
            if (bottomItem) itemLines.push(`Bottom: ${bottomItem}.`);
            if (shoeItem) itemLines.push(`Shoes: ${shoeItem}.`);
            if (hatItem) itemLines.push(`Hat: ${hatItem}.`);

            content = (
                <>
                    <OutfitParagraph>
                        {baseTempText} {rainText}
                    </OutfitParagraph>

                    {itemLines.length > 0 && (
                        <OutfitList>
                            {itemLines.map((line, idx) => (
                                <li key={idx}>{line}</li>
                            ))}
                        </OutfitList>
                    )}

                    {ageComment && <OutfitParagraph>{ageComment}</OutfitParagraph>}
                    {genderComment && (
                        <OutfitParagraph>{genderComment}</OutfitParagraph>
                    )}
                </>
            );
        }
    }

    return (
        <OutfitContainer>
            <OutfitTitle>Outfit Suggestion</OutfitTitle>
            {content}
        </OutfitContainer>
    );
}


export default OutfitSuggestion;


