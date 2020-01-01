### Class Hierarchy Manager
It has the following APIs:

#### Add new class
```
GET: /cheditor/api/addclass?cid={CLASS-ID}&name={CLASS-NAME}&abstract={true/falase}&pid={PARENT-ID}
```
Specifications:
- The 'cid' and 'name' are mandatory fields
- The class is also persisted in DB
- On successful insertion, the following response would be sent:
```
{
    "ret": "true"
}
```
- The error response would like the following:
```
{
    "ret": "false",
    "message": "The cid '1' already exists."
}
```

#### Add multiple classes
```
POST: /cheditor/api/addClassJSON
```
Specifications:
- The 'cid' and 'name' are mandatory fields
- The classes are also persisted in DB
- Sample request body:
```
{
  "classes": [
    {
      "cid": 13,
      "name": "RowingboatI",
      "abstract": false
    },
    {
      "cid": 14,
      "name": "GondolaI",
      "abstract": false
    }
  ]
}
```
- On successful insertion, the following response would be sent:
```
{
    "ret": "true"
}
```
- The error response would like the following:
```
{
    "ret": "false",
    "message": "The cid '1' already exists."
}
```

#### Get specific class information
```
GET: /cheditor/api/getclass/{class-id}
```
Specifications:
- Sample response:
```
{
    "cid": 1,
    "pid": 0,
    "name": "Vehicle",
    "isAbstract": true
}
```
- If the 'cid' is not present, the following error will be thrown:
```
{
    "ret": "false",
    "message": "The cid 11 does not exist"
}
```

#### Delete the class
```
GET: /cheditor/api/deleteclass/{class-id}
```
Specifications:
- Deletes the class and all its sub-classes
- Deletes the class from DB
- On successful deletion, the following reponse will be sent:
```
{
    "ret": "true"
}
```
- If the 'cid' is not present, the following error will be thrown:
```
{
    "ret": "false",
    "message": "The cid 11 does not exist"
}
```

#### Update the class name
```
GET: /cheditor/api/editclass/{class-id}
```
Specifications:
- The 'name' is mandatory field
- The 'name' cannot be same as an existing class
- If the 'pid' is changed, the complete subtree will be shifted to the new parent
- The same changes are reflected in the DB
- Request body:
```
{
	"name":"SuperBoat",
	"pid":1,
	"isAbstract":true
}
```
- If the 'cid' is not present, the following error will be thrown:
```
{
    "ret": "false",
    "message": "The cid 11 does not exist"
}
```

#### Search for classes
```
GET: /cheditor/api/searchclasses?tag={TAG}
```
- Sample response:
```
{
    "classes": [
        {
            "cid": 8,
            "name": "Rowingboat",
            "pid": 6,
            "abstract": false
        },
        {
            "cid": 4,
            "name": "Watercraft",
            "pid": 1,
            "abstract": false
        },
        {
            "cid": 7,
            "name": "Powerboat",
            "pid": 6,
            "abstract": false
        }
    ]
}
```
- The tag is case insensitive
- **If no classes are present which has specified tag in their names, empty classes array will be sent.**

#### Get all super classes
```
GET: /cheditor/api/superclasses/{class-id}
```
Specifications:
- Sample response:
```
{
    "list": [
        {
            "cid": 1,
            "name": "Vehicle"
        }
    ]
}
```
- If the 'cid' is not present, the following error will be thrown:
```
{
    "ret": "false",
    "message": "The cid 11 does not exist"
}
```

#### Get all sub classes
```
GET: /cheditor/api/subclasses/{class-id}
```
Specifications:
- Sample response:
```
{
    "cid": 0,
    "name": "Root",
    "superclassOf": [
        {
            "cid": 1,
            "name": "Vehicle",
            "superclassOf": [
                {
                    "cid": 2,
                    "name": "Car"
                },
                {
                    "cid": 3,
                    "name": "Plane"
                },
                {
                    "cid": 4,
                    "name": "Watercraft",
                    "superclassOf": [
                        {
                            "cid": 5,
                            "name": "Ship"
                        },
                        {
                            "cid": 6,
                            "name": "Boat",
                            "superclassOf": [
                                {
                                    "cid": 7,
                                    "name": "Powerboat"
                                },
                                {
                                    "cid": 8,
                                    "name": "Rowingboat",
                                    "superclassOf": [
                                        {
                                            "cid": 9,
                                            "name": "Gondola"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "cid": 10,
                            "name": "SailingVessel"
                        }
                    ]
                }
            ]
        }
    ]
}
```
- **To get all the classes, pass cid as 0.**
- If the 'cid' is not present, the following error will be thrown:
```
{
    "ret": "false",
    "message": "The cid 11 does not exist"
}
```
