package ktsco.app.codes;

public enum CodeMap {
  B100, // Bill Saved,
  B101, // Bill Number Duplicated
  B104, // Bill Number NOT Found
  B102, // Bill Can't be deleted due to having receipts
  B103, // Bill Deleted Successfully
  P100, // Duplicate Product Name
  P101, // Product Not Found
  P102, // Product Delete Success
  C100, // Customer name Required
  C101, // Duplicate Name
  C102, // NOT FOUND
  C103, // Delete Success
  D100, // Date Parse
  D101, // Date Format Wrong
  E100, // Expense Saved
  E101, // Bill Save error
  E102, // Expense Bill Not FOUND
  R100, // Receipt Saved
  R101, // Received Amount more that total amount
  R104, // Receipt Not Found
  R102, // Receipt Deleted
}
