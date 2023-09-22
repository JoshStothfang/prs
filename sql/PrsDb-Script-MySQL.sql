DELETE from RequestLines where id>0;
DELETE from Requests where id>0;
DELETE from Products where id>0;
DELETE from Vendors where id>0;
DELETE from Users where id>0;

ALTER TABLE Users AUTO_INCREMENT = 1;
ALTER TABLE Vendors AUTO_INCREMENT = 1;
ALTER TABLE Products AUTO_INCREMENT = 1;
ALTER TABLE Requests AUTO_INCREMENT = 1;
ALTER TABLE RequestLines AUTO_INCREMENT = 1;

INSERT INTO `PrsDb`.`Users` (`username`, `password`, `firstname`, `lastname`, `phone`, `email`, `isReviewer`, `isAdmin`)
VALUES
    ('admin', 'PinkUnicorn123', 'John', 'Doe', '837-689-9384', 'jdoe@prs.com', 0, 1),
    ('bshakes', '1heartTheatre', 'Bill', 'Shakespeare', '485-068-2265', 'william@theglobe.com', 0, 0),
    ('famoushippo', 'underd0gst0ry', 'Fiona', 'Hippo', '932-234-7001', 'fionahippo@cincyzoo.com', 0, 0);

INSERT INTO `PrsDb`.`Vendors` (`code`, `name`, `address`, `city`, `state`, `zip`, `phone`, `email`)
VALUES
    ('AP9304', 'Apple', '1 Apple Park Way', 'Cupertino', 'CA', '95014', '800-275-2273', 'tcook@apple.com'),
    ('PR2475', 'Procter & Gamble', '1 Procter and Gamble Plz', 'Cincinnati', 'OH', '45202', '513-983-1100', 'jmoeller@pg.com'),
    ('GE5712', 'General Electric', '1 Financial Center STE 3700', 'Boston', 'MA', '02111', '407-378-6203', 'hculp@ge.com');

INSERT INTO `PrsDb`.`Products` (`partNbr`, `name`, `price`, `unit`, `photoPath`, `vendorId`)
VALUES
    ('TI6784', 'Tide', 10.00, 'each', 'path/to/photo1.jpeg', 2),
    ('OV8353', 'Oven', 250.00, 'each', 'path/to/photo2.jpeg', 3),
    ('MA2884', 'MacBook Air', 1000.00, 'each', 'path/to/photo3.jpeg', 1);

INSERT INTO `PrsDb`.`Requests` (`description`, `justification`, `deliveryMode`, `status`, `total`, `userId`)
VALUES
    ('Request 1', 'one', 'Pickup', 'NEW', 0, 2),
    ('Request 2', 'two', 'Pickup', 'NEW', 0, 3),
    ('Request 3', 'three', 'Pickup', 'NEW', 0, 1);

INSERT INTO `PrsDb`.`RequestLines` (`requestId`, `productId`, `quantity`)
VALUES
    (1, 3, 1),
    (1, 1, 3),
    (2, 3, 2),
    (3, 1, 5),
    (3, 2, 2),
    (3, 3, 1);
