#!/bin/bash



ARM_SUBSCRIPTION_ID="c44bbc5b-0365-41d5-b8aa-e804bebc07e5"
ARM_TENANT_ID="f4da89be-b66b-422d-acdb-02b27596a6e6"

echo $ARM_TENANT_ID

#create service principal
az ad sp create-for-rbac --role="Contributor" --scopes="/subscriptions/c44bbc5b-0365-41d5-b8aa-e804bebc07e5"


#log to service principal




ARM_CLIENT_ID="ecf838f6-133d-4ea8-839b-ecd354212cb6"
ARM_CLIENT_SECRET="GT3-BDpL5MWyC9bQvA9uSLJXztpE~U8FOA"
ARM_TENANT_ID="f4da89be-b66b-422d-acdb-02b27596a6e6"


az login --service-principal -u $ARM_CLIENT_ID -p $ARM_CLIENT_SECRET --tenant $ARM_TENANT_ID