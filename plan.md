# Step 1: Google Auth

Page 1: Single link: 
- [Log in with Google]

Action: Clicking the link takes you to Google Login, which then redirects to page 2.

Page 2: 
- You are logged in as [shows your google user name] ([shows your user level])
- Link: [Log out]

There should be a config file, that allows the association of google logins with roles. It should also allow domains, e.g.,
```
{
"admin": [ "user@domain", "user2@domain2"],
"user": [ "@edtechhub.org", "user3@domain3" ] 
}
```

# Step 2 - implement the form.

One you are logged in, you see a form on Page 2:

Page 2: 
- You are logged in as [shows your google user name] ([shows your user level])
- Link: [Log out]
- You can submit a new record.
- Title [text input]
- author  [text input]
- date  [text input]
- output category  [dropdown]
- output category number  [text input]
- primary team [dropdown]
- url of the google document  [text input]
- Submit button

There should be a configuration file:
```
{
"outputCategories": [ A, B, C],
"primaryTeams": [D, E, F]
}
```

Page 3:
- Your record is being created. One moment please.

* 'Fake API call': Set DOI=123 and ZOTEROID=ABC

* upon successful creation the call will the logged into a log file 'activit-log.txt' with the following information: user email, zotero-id, zenodo-id


On the same page, now add this text:
- A Zotero ID and a DOI have been registered. Please include the follwoing citation in the document that you are writing (use GDoc url for hyperlink). Please note that this DOI and the link to the Evidence library is not live yet. It will only be live once the document has gone through the required approval stages.
- Your citation is:
- "[AUTHOR] ([date]). [Title].  DOI: [DOI]. Available from https://edtechhub.org/lib/[ZOTEROID] . Avaialble under Creative Commons By.". 
- Button with the text "Create another record"

# Step 3 - replace fake API call with actual API call.

The 'Fake API call' is replaced by the actual API calls to Zenodo/Zotero.

# Step 4. Provide EdTech Hub layout
Should be a 'pluggable'.
