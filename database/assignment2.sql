-- Create account Tony Stark
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');


-- Modify Tony Start account type to 'Admin'
UPDATE account 
SET account_type = 'Admin'
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Delete Tony Stark record
DELETE FROM account 
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Update GM Hummer description 
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'the small interiors', 'a huge interior')
WHERE inv_id = 10;

--  inner join to select the make and model fields from the inventory table and the classification name field from the classification table for inventory items that belong to the "Sport" category
SELECT inv_make, inv_model, c.classification_name
FROM inventory AS i
INNER JOIN classification AS c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- Update all records in inventory to add "/vehicles" to file path in img and thumbnail
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles');
