import json
import urllib.request


#This function get the first 400 data points from the synthetic data
def getTrainData():

    #Url to retrieve data from
    syntheticDataUrl = "https://bmmkl4lj0d.execute-api.us-east-1.amazonaws.com/prod/M00752552"

    #Retrieve the JSON data from URL
    response = urllib.request.urlopen(syntheticDataUrl)

    #Parse JSON data
    data = json.loads(response.read().decode())

    #Extract first 400 data points fom JSON data
    target_data = data['target'][:400]

    #Extract start value from JSON data
    start_value = data['start']

    #Define output result
    output_data = {
        "start": start_value,
        "target": target_data
    }

    # Write the training data to new JSON file
    with open('synthetic_train.json', 'w') as f:
        json.dump(output_data, f)

    print("Successfully saved first 400 data points to synthetic_train.json")

#Call function to get 400 data points
getTrainData()
