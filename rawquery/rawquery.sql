-- Get nearest location to monas
SELECT
	"out"."id" AS "id",
	"out"."name" AS "name",
	"out"."picture" AS "picture",
	"out"."address" AS "address",
	"out"."longitude" AS "longitude",
	"out"."latitude" AS "latitude"
FROM
	"outlets" "out"
ORDER BY
	( longitude - - 6.1753924 ) * ( longitude - - 6.1753924 ) + ( latitude - 106.8245779 ) * ( latitude - 106.8245779 ) ASC;

-- Show total products
SELECT count(*) as total_product FROM products;

-- Select all outlet name
SELECT name, address, longitude, latitude FROM outlets;

-- Show brand name
SELECT name from brands