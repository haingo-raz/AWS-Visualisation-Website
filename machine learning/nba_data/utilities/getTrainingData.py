import json

def getTrainData():
    # Read from existing JSON file
    # Opening JSON file
    f = open('C:/Users/Haingo/Desktop/cw2 code/machine learning/nba data/full dataset/Warriors.json')
    
    # returns JSON object as 
    # a dictionary
    data = json.load(f)

    #Extract start value from JSON data
    start_value = data['start']
    
    #Extract first 400 data points fom JSON data
    target_data = data['target'][:410]

    #Define output result
    output_data = {
        "start": start_value,
        "target": target_data
    }

    # Write the training data to new JSON file
    with open('C:/Users/Haingo/Desktop/cw2 code/machine learning/nba data/training data/Warriors_train.json', 'w') as f:
        json.dump(output_data, f)

    print("Successfully saved first 400 data points to .json")


#Call function to get 400 data points
getTrainData()