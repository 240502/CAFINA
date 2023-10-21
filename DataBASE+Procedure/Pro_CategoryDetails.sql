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
Alter table Category
ADD [Object_id] int foreign key references [Object](id)
on update cascade on delete cascade
Select * From CategoryDetails
Select * From Category