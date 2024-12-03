# Vending Machine

## Steps to run 

### Using docker compose
  ```bash
  docker compose up --build
  ```

Note: Can also be run manually to the respective client and server folder. More details in their respective README.md files

## Assumptions
  - Vending machine with specified product and limited stock. (eg: Coke, 10 units)
  - Limited funds (100 coins and 200 cash)
  - User can insert any amount of money and can buy the specified products. Cash change when use input amount is greater than actual cost.
  - System will notify user if the item is out of stock.
  - User can only return one of each item at a time and get refunded the amount equivalent to the cost of the item.
  - There is no restriction in refund. This is to rise the case for system to go out of funds
  - User can only return items that are in stock.
  - system will notify user if the system is out of funds.
