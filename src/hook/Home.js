// import { Layout } from "antd";
import isEmpty from "lodash.isempty";
import React, { useState } from "react";
import Form from "./Form";
import UserList from "./UserList";

function Home() {
  const [userList, setUserList] = useState([{ email: "dangkhoa200399@gmail.com", id: 272, name: "Nguyễn Huỳnh Đăng Khoa", password: "admin131323", phone: "0988379752", role: "quanTri", username: "admin" },
  { email: "minh1234@gmail.com", id: 273, name: "Nguyễn Huỳnh Đăng Minh", password: "admin131323", phone: "0123456789", role: "quanTri", username: "minh123" }]);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null)
  const [isSearch, setIsSearch] = useState(false);
  
  function createUser(user) {
    const foundUser = userList.find((item) => {
      return item.username === user.username;
    });

    if (foundUser) return alert("Tài khoản đã tồn tại");

    setUserList([...userList, user]);
  }

  function deleteUser(userId) {
    const cloneUserList = [...userList]
    const indexUser = cloneUserList.findIndex(item => {
      return item.id === userId
    })

    if (indexUser === -1) return alert('Id invalid!!');
    cloneUserList.splice(indexUser, 1);
    setUserList(cloneUserList);

  }

  const getUpdateUser = (user) => {
    setSelectedUser(user);
  }

  const updateUser = (user) => {
    const cloneUserList = [...userList];
    const index = cloneUserList.findIndex(item => item.id === user.id)
    if (index === -1) return;
    cloneUserList[index] = user;
    setUserList(cloneUserList);
    setSelectedUser(null);
  }

  const handleSearch = (searchInput) => {
    const cloneListSearch = [...userList];
    let inputS = searchInput.target.value.trim().toLowerCase();
    if(inputS === '') return setIsSearch(false);

    setIsSearch(true);
    const foundEmail = cloneListSearch.filter(item => item.email.toLowerCase().includes(inputS))
    const foundName = cloneListSearch.filter(item => item.name.toLowerCase().includes(inputS))
    const foundUserName = cloneListSearch.filter(item => item.username.toLowerCase().includes(inputS))
    const foundNumber = cloneListSearch.filter(item => item.phone.includes(inputS))
    
    if(!isEmpty(foundEmail)) return setSearchResult(foundEmail);
    if(!isEmpty(foundName)) return setSearchResult(foundName);
    if(!isEmpty(foundUserName)) return setSearchResult(foundUserName);
    if(!isEmpty(foundNumber)) return setSearchResult(foundNumber);
  }

  return (
    <div>
      <h1>Quản Lý User</h1>
      <Form selectedUser={selectedUser} createUser={createUser} updateUser={updateUser} />
      <UserList searchUser={handleSearch} users={isSearch ? searchResult : userList} deleteUser={deleteUser} editUser={getUpdateUser} />
    </div>
  );
}

export default Home;
