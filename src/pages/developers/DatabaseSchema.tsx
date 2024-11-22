import React from 'react';

export function DatabaseSchema() {
  return (
    <div className="prose max-w-none">
      <h2>Database Schema</h2>

      <h3>Overview</h3>
      <p>
        The K12 Help Desk uses PostgreSQL as its primary database, with Prisma as the ORM.
        The schema is designed to support all core functionalities while maintaining data integrity
        and relationships between different entities.
      </p>

      <h3>Entity Relationship Diagram</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="text-sm overflow-x-auto">
{`User ────┬─── Ticket ────── Comment
          │      │
          │      ├─── Asset
          │      │
          └──────┘`}
        </pre>
      </div>

      <h3>Models</h3>

      <h4>User</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  role          Role      @default(END_USER)
  microsoftId   String?   @unique
  googleId      String?   @unique
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  tickets       Ticket[]  @relation("CreatedTickets")
  assignedTickets Ticket[] @relation("AssignedTickets")
  assets        Asset[]   @relation("AssignedAssets")
}`}
        </pre>
        <p className="mt-4 text-sm text-gray-600">
          The User model represents system users with authentication and role information.
          It maintains relationships with tickets (both created and assigned) and assets.
        </p>
      </div>

      <h4>Asset</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`model Asset {
  id            String    @id @default(cuid())
  type          AssetType
  serialNumber  String    @unique
  name          String
  status        AssetStatus @default(AVAILABLE)
  purchaseDate  DateTime?
  warrantyEnd   DateTime?
  location      String?
  notes         String?
  assignedTo    User?     @relation("AssignedAssets", fields: [assignedToId], references: [id])
  assignedToId  String?
  tickets       Ticket[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  customFields  Json?
}`}
        </pre>
        <p className="mt-4 text-sm text-gray-600">
          The Asset model tracks all IT assets including Chromebooks, desktops, and other equipment.
          It supports custom fields for flexible asset tracking.
        </p>
      </div>

      <h4>Ticket</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`model Ticket {
  id            String    @id @default(cuid())
  title         String
  description   String
  status        TicketStatus @default(OPEN)
  priority      Priority  @default(MEDIUM)
  type          TicketType
  createdBy     User      @relation("CreatedTickets", fields: [createdById], references: [id])
  createdById   String
  assignedTo    User?     @relation("AssignedTickets", fields: [assignedToId], references: [id])
  assignedToId  String?
  asset         Asset?    @relation(fields: [assetId], references: [id])
  assetId       String?
  comments      Comment[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}`}
        </pre>
        <p className="mt-4 text-sm text-gray-600">
          The Ticket model represents help desk tickets with support for different types,
          priorities, and statuses. It maintains relationships with users, assets, and comments.
        </p>
      </div>

      <h4>Comment</h4>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <pre className="bg-gray-100 p-4 rounded-md">
{`model Comment {
  id            String    @id @default(cuid())
  content       String
  ticket        Ticket    @relation(fields: [ticketId], references: [id])
  ticketId      String
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}`}
        </pre>
        <p className="mt-4 text-sm text-gray-600">
          The Comment model stores ticket comments and updates, maintaining a history of
          ticket-related communications.
        </p>
      </div>

      <h3>Enums</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h4 className="text-lg font-semibold mb-4">Role</h4>
        <pre className="bg-gray-100 p-4 rounded-md mb-4">
{`enum Role {
  SUPER_ADMIN
  ADMINISTRATOR
  CHROMEBOOK_ADMIN
  HELP_DESK
  END_USER
}`}
        </pre>

        <h4 className="text-lg font-semibold mb-4">AssetType</h4>
        <pre className="bg-gray-100 p-4 rounded-md mb-4">
{`enum AssetType {
  CHROMEBOOK
  DESKTOP_PC
  MAC
  INTERACTIVE_PANEL
  PRINTER
  PROJECTOR
  OTHER
}`}
        </pre>

        <h4 className="text-lg font-semibold mb-4">AssetStatus</h4>
        <pre className="bg-gray-100 p-4 rounded-md mb-4">
{`enum AssetStatus {
  AVAILABLE
  ASSIGNED
  IN_REPAIR
  RETIRED
  LOST
}`}
        </pre>

        <h4 className="text-lg font-semibold mb-4">TicketStatus</h4>
        <pre className="bg-gray-100 p-4 rounded-md mb-4">
{`enum TicketStatus {
  OPEN
  IN_PROGRESS
  ON_HOLD
  RESOLVED
  CLOSED
}`}
        </pre>

        <h4 className="text-lg font-semibold mb-4">Priority</h4>
        <pre className="bg-gray-100 p-4 rounded-md">
{`enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}`}
        </pre>
      </div>

      <h3>Indexes and Constraints</h3>
      <ul>
        <li>Unique constraints on email and external IDs (microsoftId, googleId)</li>
        <li>Unique constraint on asset serial numbers</li>
        <li>Foreign key constraints for all relationships</li>
        <li>Indexes on frequently queried fields (status, type, createdAt)</li>
      </ul>

      <h3>Migrations</h3>
      <p>
        Database migrations are handled through Prisma Migrate. To create and apply migrations:
      </p>
      <pre className="bg-gray-50 p-4 rounded-lg mb-4">
{`# Generate a migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy`}
      </pre>

      <h3>Best Practices</h3>
      <ul>
        <li>Always use transactions for operations affecting multiple tables</li>
        <li>Implement soft deletes for important data</li>
        <li>Use appropriate field types and constraints</li>
        <li>Keep migrations reversible when possible</li>
        <li>Regularly backup database data</li>
      </ul>
    </div>
  );
}