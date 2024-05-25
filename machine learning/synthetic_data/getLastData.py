import json
import urllib.request

#This function get the last 100 data points from the synthetic data
def getLastData(): 

    # Define the URL to retrieve the JSON data from
    url = ""

    # Retrieve the JSON data from the URL using urllib.request.urlopen()
    response = urllib.request.urlopen(url)

    # Parse the JSON data from the file-like object returned by urllib.request.urlopen()
    data = json.loads(response.read().decode())

    # Extract the last 100 data points from the 'target' value in the JSON data
    target_data = data['target'][-100:]

    # Extract the 'start' value from the JSON data
    start_value = data['start']

    # Create a new dictionary containing the 'start' value and the last 100 data points from the 'target' value
    output_data = {
        "start": start_value,
        "target": target_data
    }

    # Write the output data to a new JSON file named 'synthetic_last.json' using json.dump()
    with open('synthetic_last.json', 'w') as f:
        json.dump(output_data, f)

    # Print a success message
    print("Successfully saved last 100 data points to synthetic_last.json")


#Call function
getLastData()