import requests

# API endpoint for NBA scores
url = "https://www.balldontlie.io/api/v1/games"

# Parameters for Boston Celtics games only
params = {
    "team_ids[]": "2",  # Boston Celtics team ID
    "per_page": "100",  # 100 results per page
}

# Request data from API
response = requests.get(url, params=params)
data = response.json()

# Iterate over all pages of results until the target score sequence is found
while True:
    # Check each game in the current page for the target score sequence
    for game in data["data"]:
        # Get the scores for Boston Celtics and their opponent
        home_score = game["home_team_score"]
        visitor_score = game["visitor_team_score"]
        
        # Check if the scores match the target sequence
        if (home_score, visitor_score) == (113, 101):
            target_index = 1
        elif target_index == 1 and (home_score, visitor_score) == (128, 121):
            target_index = 2
        elif target_index == 2 and (home_score, visitor_score) == (100, 105):
            target_index = 3
        elif target_index == 3 and (home_score, visitor_score) == (112, 0):
            # Celtics scored 112 and opponent scored 0
            print(f"The Boston Celtics scored 113, 101, 128, 121, 100, 105, 112 consecutively in the {game['season']} season.")
            break
        else:
            target_index = 0
        
    # Check if the target sequence was found in this page
    if target_index == 3:
        break
    
    # Check if there are more pages of results to fetch
    if data["meta"]["next_page"]:
        response = requests.get(data["meta"]["next_page"])
        data = response.json()
    else:
        # Target sequence not found in any page of results
        print("The Boston Celtics did not score 113, 101, 128, 121, 100, 105, 112 consecutively in any season.")
        break
