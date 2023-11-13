Select * from [Status]

Create Proc Pro_GetStatusById
	@id int
As
	Begin
		Select * from [Status]
		Where id = @id
	End
Create Proc Pro_GetListStatusManager
As
	Begin
		Select * From [Status]
	End
