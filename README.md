Quasar App Extension QEmail
===
Email template for Quasar Framework

# Install
```bash
quasar ext add qemail
```
Quasar CLI will retrieve it from NPM and install the extension.

# Uninstall
```bash
quasar ext remove qemail
```

# Functionality
| Vue property        | Type           | Description  |
| ------------- |:-------------:| -----:|
| senders      | Array\<string> | List of email addresses which can be selected as the 'From' field |
| hiddenFields      | Array\<string> | Fields to hide in the template |
| disabledFields      | Array\<string> | Fields to disable in the template |

All properties of QSelect, QInput and QEditor will be passed down to the respective component(s).

# Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).
