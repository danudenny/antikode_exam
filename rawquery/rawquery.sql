-- Brand name
-- Outlet name, address, longitude, latitude
-- Total product
-- Distance Outlet position from Monas Jakarta in Kilometers
SELECT br.NAME                                                   AS brand_name,
       OUT."name"                                                AS outlet_name,
       out.address,
       out.longitude,
       out.latitude,
       COUNT(pr.ID)                                              AS jumlah_product,
       111.111 *
       DEGREES(ACOS(LEAST(1.0, COS(RADIANS(out.latitude))
                                   * COS(RADIANS(-6.1753924))
                                   * COS(RADIANS(out.longitude - 106.8245779))
           + SIN(RADIANS(out.latitude))
                                   * SIN(RADIANS(-6.1753924))))) AS distance_in_km
FROM brands br
         LEFT JOIN outlets OUT ON OUT.brand_id = br."id"
         LEFT JOIN products pr ON pr.brand_id = br.ID
GROUP BY br.NAME,
         out.address,
         OUT.NAME,
         OUT.longitude,
         OUT.latitude
ORDER BY (OUT.longitude - - 6.1753924) * (OUT.longitude - - 6.1753924) +
         (OUT.latitude - 106.8245779) * (OUT.latitude - 106.8245779) ASC;