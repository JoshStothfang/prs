USE PrsDb;
GO

DELETE RequestLines;
DELETE Requests;
DELETE Products;
DELETE Vendors;
DELETE Users;
GO

DBCC CHECKIDENT ('Users', RESEED, 0);
DBCC CHECKIDENT ('Vendors', RESEED, 0);
DBCC CHECKIDENT ('Products', RESEED, 0);
DBCC CHECKIDENT ('Requests', RESEED, 0);
DBCC CHECKIDENT ('RequestLines', RESEED, 0);
GO

INSERT Users (Username, Password, Firstname, Lastname, Phone, Email, IsReviewer, IsAdmin)
VALUES 
    ('admin', 'PinkUnicorn123', 'John', 'Doe', '837-689-9384', 'jdoe@prs.com', 0, 1),
    ('bshakes', '1heartTheatre', 'Bill', 'Shakespeare', '485-068-2265', 'william@theglobe.com', 0, 0),
    ('famoushippo', 'underd0gst0ry', 'Fiona', 'Hippo', '932-234-7001', 'fionahippo@cincyzoo.com', 0, 0);
GO

INSERT Vendors (Code, Name, Address, City, State, Zip, Phone, Email)
VALUES 
    ('AP9304', 'Apple', '1 Apple Park Way', 'Cupertino', 'CA', '95014', '800-275-2273', 'tcook@apple.com'),
    ('PR2475', 'Procter & Gamble', '1 Procter and Gamble Plz', 'Cincinnati', 'OH', '45202', '513-983-1100', 'jmoeller@pg.com'),
    ('GE5712', 'General Electric', '1 Financial Center STE 3700', 'Boston', 'MA', '02111', '407-378-6203', 'hculp@ge.com');
GO

INSERT Products (PartNbr, Name, Price, Unit, PhotoPath, VendorId)
VALUES 
    ('TI6784', 'Tide', 10.00, 'each', 'path/to/photo1.jpeg', 2),
    ('OV8353', 'Oven', 250.00, 'each', 'path/to/photo2.jpeg', 3),
    ('MA2884', 'MacBook Air', 1000.00, 'each', 'path/to/photo3.jpeg', 1);
GO

INSERT Requests (Description, Justification, DeliveryMode, Status, Total, UserID)
VALUES
    ('Request 1', 'one', 'Pickup', 'REVIEW', 1030, 2),
    ('Request 2', 'two', 'Pickup', 'NEW', 2000, 3),
    ('Request 3', 'three', 'Pickup', 'REVIEW', 1550, 1),
    ('Request 4', 'four', 'Pickup', 'NEW', 30, 1);
GO

INSERT RequestLines (RequestId, ProductId, Quantity)
VALUES
    (1, 3, 1),
    (1, 1, 3),
    (2, 3, 2),
    (3, 1, 5),
    (3, 2, 2),
    (3, 3, 1),
    (4, 1, 3)
GO