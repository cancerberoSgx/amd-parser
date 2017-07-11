parse javascript module files written with amd / requirejs and let you do 'interesting' things with parsed information. Research project!

#Use

generate metadata of given .js files :

    node src/cli --input "test-files/project1/**/*.js" --output "test-files/amd-metadata.json"

print dependency metadata of Address.Model module (not implemented yet):

    node src/cli --input amd-metadata.json --main "AddressModel" 

generate a amd bundle file from metadata from 'AddressModel' entry point (not implemented yet):

    node src/cli --input amd-metadata.json --main "AddressModel" --output bundle.js

explanation : if you don't pass --main - then metadata will be generated from project .js files. if you pass --main then a bundle or other metadata will be generated from given main amd entry point.

