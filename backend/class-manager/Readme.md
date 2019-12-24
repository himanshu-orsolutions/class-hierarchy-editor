### Class Hierarchy Manager
It has the following APIs:

#### Add new class
```
GET: /cheditor/api/addclass?cid=1&name=Vehicle&abstract=true&pid=0
```
Specifications:
- The 'cid' and 'name' are mandatory fields
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
- Sample request body:
```
{
  "classes": [
    {
      "cid": "8",
      "name": "Rowingboat",
      "abstract": "false"
    },
    {
      "cid": "9",
      "name": "Gondola",
      "abstract": "false"
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
    "cid": "9",
    "name": "Gondola",
    "isAbstract": "false",
    "pid": "8"
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
            "cid": "6",
            "name": "Boat"
        },
        {
            "cid": "4",
            "name": "Watercraft"
        },
        {
            "cid": "1",
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
    "cid": "4",
    "name": "Watercraft",
    "superclassOf": [
        {
            "cid": "5",
            "name": "Ship"
        },
        {
            "cid": "6",
            "name": "Boat",
            "superclassOf": [
                {
                    "cid": "7",
                    "name": "Powerboat"
                }
            ]
        },
        {
            "cid": "10",
            "name": "SailingVessel"
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
