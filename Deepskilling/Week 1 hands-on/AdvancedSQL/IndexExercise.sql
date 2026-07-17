CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DepartmentID INT,
    Salary DECIMAL(10,2)
);

CREATE INDEX IX_Employees_DepartmentID
ON Employees(DepartmentID);

SELECT *
FROM Employees
WHERE DepartmentID = 1;