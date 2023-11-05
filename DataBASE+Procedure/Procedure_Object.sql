
Use Cafina

Create Proc GetObjectById
	@id int
As
	Begin
		Select * From [Object]
		Where id = @id
	End
exec GetObjectById 2
Create Proc GetObjectByName
	@name nvarchar(50)
as
	Begin
		Select * From [Object]
		Where Contains(TenDoiTuong,@name)
	End

Create Proc Pro_Create_Ob
	@TenDoiTuong nvarchar(50)
As
	Begin
		If(Exists (Select * From [Object] Where TenDoiTuong = @TenDoiTuong))
		Begin
			Return -1
		End
		Else 
		Begin
			Insert into [Object] (TenDoiTuong)
			Values (@TenDoiTuong)
		End
	End
Create Proc Pro_Delete_Ob
	@id int
As
	Begin
		If(Not Exists (Select * From [Object] Where id = @id))
		Begin
			Return -1
		End
		Else
		Begin
			Delete [Object]
			Where id = @id
		End
	End
Exec Pro_Delete_Ob 6
Create Proc Pro_Update_Ob
	@id int ,
	@TenDoiTuong Nvarchar(50)
As
	Begin
		If(Not Exists(Select * From [Object] Where id = @id))
		Begin
			Return -1
		End
		Else 
		Begin
			Update [Object]
			Set TenDoiTuong = @TenDoiTuong
			Where id = @id
		End
	End
Create Proc Pro_Get_List_Ob
As
	Begin
		Select * From Object
	End
Exec Pro_Get_List_Ob