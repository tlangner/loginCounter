
import unittest
import os
import testLib


        
class TestAddUser(testLib.RestTestCase):
    """Test adding users"""
    def assertResponse(self, respData, count = 1, errCode = testLib.RestTestCase.SUCCESS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    def testAdd1(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData, count = 1)


class TestLoginUser(testLib.RestTestCase):
    """Test Login User"""
    def assertResponse(self, respData, count = 2, errCode = testLib.RestTestCase.SUCCESS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    def testLogin1(self):
        self.makeRequest("/users/add", method="POST", data = { 'user' : 'travis', 'password' : 'hello'} )
        respData = self.makeRequest("/users/login", method="POST", data = { 'user' : 'travis', 'password' : 'hello'} )
        self.assertResponse(respData, count = 2)


class TestAddDuplicateUser(testLib.RestTestCase):
    """Test Login User"""
    def assertResponse(self, respData, count = None, errCode = testLib.RestTestCase.ERR_USER_EXISTS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    def testAdd2(self):
        self.makeRequest("/users/add", method="POST", data = { 'user' : 'Jim', 'password' : 'password'} )
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'Jim', 'password' : 'password'} )
        self.assertResponse(respData, count = None)


class TestAddEmptyUser(testLib.RestTestCase):
    """Test Login User"""
    def assertResponse(self, respData, count = None, errCode = testLib.RestTestCase.ERR_BAD_USERNAME):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    def testAdd3(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : '', 'password' : 'password'} )
        self.assertResponse(respData, count = None)


class TestUserWithTooLongPW(testLib.RestTestCase):
    """Test Login User"""
    def assertResponse(self, respData, count = None, errCode = testLib.RestTestCase.ERR_BAD_PASSWORD):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    def testAdd4(self):
        password = "";
        for i in range(0,129):
            password += 'p' 
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user2', 'password' : password} )
        self.assertResponse(respData, count = None)

class TestLoginUserIncorrectPW(testLib.RestTestCase):
    """Test Login User"""
    def assertResponse(self, respData, count = 2, errCode = testLib.RestTestCase.ERR_BAD_CREDENTIALS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    def testLogin1(self):
        self.makeRequest("/users/add", method="POST", data = { 'user' : 'Kurtis', 'password' : 'hello'} )
        respData = self.makeRequest("/users/login", method="POST", data = { 'user' : 'Kurtis', 'password' : 'hello!'} )
        self.assertResponse(respData, count = None)

class TestLoginUserDoesNotExist(testLib.RestTestCase):
    """Test Login User"""
    def assertResponse(self, respData, count = 2, errCode = testLib.RestTestCase.ERR_BAD_CREDENTIALS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    def testLogin1(self):
        respData = self.makeRequest("/users/login", method="POST", data = { 'user' : 'KurtisFreedland', 'password' : 'hello!'} )
        self.assertResponse(respData, count = None)




