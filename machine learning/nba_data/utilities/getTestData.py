import json

#Lakers 410 178 
#Bulls 410 133
#Celtics 410 225
#Rockets 410 206
#Warriors 410 238

def getTrainData():
    # Read from existing JSON file
    # Opening JSON file
    f = open('C:/Users/Haingo/Desktop/cw2 code/machine learning/nba data/full dataset/Celtics.json')
    
    # returns JSON object as 
    # a dictionary
    data = json.load(f)

    #Extract start value from JSON data
    start_value = data['start']
    
    #Extract last data points fom JSON data
    target_data = data['target'][-225:]

    #Define output result
    output_data = {
        "start": start_value,
        "target": target_data
    }

    # Write the training data to new JSON file
    with open('C:/Users/Haingo/Desktop/cw2 code/machine learning/nba data/test dataset/Celtics_test.json', 'w') as f:
        json.dump(output_data, f)

    print("Successfully saved first 100 data points to .json")

#Call function to get 400 data points
getTrainData()