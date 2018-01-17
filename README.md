# UAV (thoughtworks homework)

### Introduction

This program is coded in javascript with node.js meant to collect flight records of a UAV() and then 
get infomation from the records.

The records could be collected by giving a file path in bash, then the records would be processed 
into a set of results waiting to be queried later.

The queries could be given through the bash, and query results would be based on the latest records.

### Instructions

#### Run Program

The program entrance file is run/app.js, it could be started by running this script with node.js
```
node run/app.js
```

operations are taken by commands after starting the program

There are record files in this directory, files can be collected by command:
```
file [-c] path/to/file
```
paramater -c is optional, the calculated results of the input record file would be cached if provided.

queris are given by command:
```
query index
```
then the results would be displayed in bash

#### Run Tests

tests are written in jasmine, so in order to run tests this moudle must be installed first

tests could be run by running the script test.js under root directory
```
node test.js
```

### Program Structure

this program mainly contains classes as listed:

* RecordCollector
* RecordManager
* Complier
* Result
* Core
* UI

#### the progress of processing the records

* step1: the records within a file is fetched by Core in the form of a string
* step2: the string is passed to RecordCollector to collected, and hash is created this time
* step3: hash and the string is passed to RecordManager to calculate under help of a Complier
* step4: Compiler would generate a function to compile the record string, this function would be 
    passed to the process of creating a result collection
* step5: RecordManager will create a result collection and store the current result, and the result
    would be cached if it should be

#### Constants and configurations

Constants being used are stored in shared/constants.js, it contains default options of API, such as commands
and compiling rules.

#### UI

UI is meant to parse commands and execute them, it contain the core of the program as its member, 
as the commands read from input, it would parse the command and then execute it, the command options 
could be overwritten by paramater options when construction UI.

#### Core

Core contains a RecordCollector and fs instance to read files.

#### RecordCollector

RecordCollector collects records in the form of a string, then caculate the hash of the string for check of 
cache, the it passes the hash and the string to a RecordManager which is a member of it by calling member 
function collect.

#### RecordManager

The duty of RecordManager is to calculate the record then create a result. Firsty it gets a _caculate function which
is created by a Complier, this function does all the compiling work. the it calls createResult function to get a 
result. The _calculate function is not called right away, it would only run when there is no cache of this record.
After the result being created, it would be stored as a static member of the RecordManager.

The constructor takes a paramater as options to create a Compiler.

#### Compiler

Compiler does only one job which is creating a _caculate function to compile the record.

The constructor takes some options, mainly as rules and symbols to be used when compiling the records, default options 
would be apllied if no options are provided.

#### Result

A Result is a result collection of a set of records, it's got a query function to query infomation about the records.
