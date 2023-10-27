use Cafina
exec Pro_Get_CateDetails 3,N'Trẻ em gái'
select * From Object
sELECT * fROM Category


alter Proc Pro_Get_CateDetails 
	@cateid nvarchar(50),
	@objectname nvarchar(50)
AS
	Begin
		Select cd.id , cd.DetailName, cd.CateId
		From CategoryDetails cd inner join  [Object] o on cD.Object_id = o.id
		Where cd.CateId = @cateid AND (TenDoiTuong Like 'All' or o.TenDoiTuong Like @objectname+'%' or o.TenDoiTuong Like '%'+@objectname)
	End
Pro_Get_CateDetails 7, N'Trẻ em gái'
Select * From CategoryDetails
Select * From Category
exec Pro_Get_List_CateDetails
Create Proc Pro_Get_List_CateDetails
As
	Begin
		Select	cd.id,cd.DetailName
		From CategoryDetails cd
	End
Create Proc Pro_Create_CateDetails
	@name nvarchar(50),
	@ob_id int,
	@cateid int
As
	Begin
		Insert Into CategoryDetails(DetailName,Object_id,CateId)
		Values(@name,@ob_id,@cateid)
	End

Create Proc Pro_Delete_CateDetails 
	@id int
As
	Begin
		Delete CategoryDetails
		Where id = @id
	End

Create Proc Pro_Update_CateDetails
	@id int,
	@name nvarchar(100),
	@ob_id int,
	@cateid int
As
	Begin
		If(Not Exists (Select * From Object where id = @ob_id))
		Begin
			Return -1
		End
		If(Not Exists (Select * From Category where id = @cateid))
		Begin
			Return -1
		End
		Update CategoryDetails
		Set DetailName = @name, CateId = @cateid, Object_id = @ob_id
		Where id = @id
	End

