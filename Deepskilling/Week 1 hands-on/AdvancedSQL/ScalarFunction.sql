CREATE FUNCTION fn_GetEmployeeCount
(
    @DepartmentID INT
)
RETURNS INT
AS
BEGIN
    DECLARE @Count INT;

    SELECT @Count = COUNT(*)
    FROM Employees
    WHERE DepartmentID = @DepartmentID;

    RETURN @Count;
END;
GO

SELECT dbo.fn_GetEmployeeCount(1) AS TotalEmployees;