import React, { useState } from 'react';

// NOTE
/*
- Use HashTable for String Command (file DataTable.js)

- Use Array for Set command (file DataList.js)
    + key -> the arrayList
    + value1 -> new value will be added
    + 
*/
/*
- String
    + SET key value: set new value to a key
    + GET key: return value from that key
    -> Use SessionStorage - clear when browser is closed.

- Set
    + SADD key value1 value2: add new value to key set
    + SREM key value1 value2: remove value from key set
    + SMEMBERS: return all items inside the key set.
    -> Use Array to store value

- Data Expiration
    + KEYS: return list of available keys
    + DEL key: delete selected key
    + EXPIRE key seconds: set timeout on a key. (no expiration as default)
*/
// DATABASE CLASS


export default function CLILedis() {

    // DATAFIELDS
    const [data, setData] = useState('')
    let inputValue = ''
    let listSet = []
    let listString = []
    let arrayData
    let arraySet = new Map()
    let newString = ''
    let valueSet = []
    // DataString for String command



    // LOGIC FUNCTIONS
    function analyzeInput() {
        inputValue = document.getElementById('input').value
        if (inputValue === null || inputValue === '') {
            return null
        }

        // split whole input command for analysis
        arrayData = inputValue.split(' ')
        console.log('All inputs ' + arrayData)


        // Command cases
        switch(arrayData[0]) {
            case 'SADD':
                // check arrayData[1](array name) is in the list Set or not.
                listSet.forEach(element => {
                    if (checkIfExist(element, arrayData[1])) {
                        console.log('Exist. Choose other name please.')
                        return false
                    }
                });
                // add all value into 1 array
                for (let i = 2; i <arrayData.length-2; i++) {
                    valueSet.data(arrayData[i])
                }
                // convert valueSet to 1 String
                valueSet.join(' ')
                // add keys and value into Set.
                arraySet.set(arrayData[1], valueSet)
                break
            case 'SREM':
                console.log('SREM command')
                listSet.forEach(element => {
                    // check if the set is in the list or not.
                    if (checkIfExist(element, arrayData[1])) {
                        // When found
                        console.log('Found.')
                        // take value from the Set
                        let valueFromSet = arraySet.get(arrayData[1])
                        // print out on console for testing
                        console.log(valueFromSet)
                        // split into substring for scanning
                        let valueForTesting = valueFromSet.split(' ')
                        let newValue
                        // beginning scanning. All unmatch value will be copy back, ignore the matched value.
                        valueForTesting.forEach(e => {
                            if (valueForTesting[e] !== arrayData[2])                            
                                newValue += valueForTesting[e] + ' '
                        })
                        // rewrite newValue into Set
                        arraySet.set(arrayData[1], newValue)
                        console.log('Remove done')
                        return true
                    }
                })
                console.log('Cannot find it.')
                break
            case 'SMEMBERS':
                // check if the list has the Set yet.
                listSet.forEach(element => {
                    if (checkIfExist(element, arrayData[1])) {
                        console.log('Found.')
                        // display Value of the Set
                        arraySet.get(arrayData[1])
                        return true
                    }
                })
                break
            case 'SET':
                console.log('SET command')
                sessionStorage.setItem(arrayData[1], arrayData[2])
                // add new keys into list
                listString.add(arrayData[1])
                break
            case 'GET':
                console.log('GET command')
                // get value from keys
                let dataSet = sessionStorage.getItem(arrayData[1])
                // display value
                console.log('Key ' + arrayData[1] + '\n' + 'Value ' + dataSet)
                break
            case 'KEYS':
                // display all available keys
                console.log(listSet + '\n' + listString)
                break
            default:
                console.log('Error')
                break
        }
        // input text function -> auto clear after submit.
        refreshInputArea()

    }

    // checking items.
    function checkIfExist(allSetItem, inputItem) {
        return allSetItem === inputItem;
    }

    function refreshInputArea() {
        document.getElementById('input').value = ''
    }

    
    
    // RENDER
    return (
        <div>
            <h1>
                Ledis Command Line
            </h1>
            <div>
                <textarea id='textWindow' rows="10" cols="5000">                   
                </textarea>
            </div>
            
            <div>
                <input type="text" name="input" id='input' autoComplete='off' autoCorrect='off' />
                <button id='btnEnter' onClick={analyzeInput}>
                    Enter
                </button>
            </div>
            
        </div>
        
    )
}

