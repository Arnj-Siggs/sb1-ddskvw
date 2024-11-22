import React from 'react';

export function ApiReference() {
  return (
    <div className="prose max-w-none">
      <h2>API Reference</h2>

      <h3>Authentication</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h4 className="text-lg font-semibold mb-4">Authentication Endpoints</h4>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-mono">POST</span>
              <code>/api/auth/login</code>
            </div>
            <p className="mt-2">Local authentication endpoint</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">
{`// Request
{
  "email": string,
  "password": string
}

// Response
{
  "user": {
    "id": string,
    "email": string,
    "name": string,
    "role": Role
  },
  "token": string
}`}
            </pre>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-mono">POST</span>
              <code>/api/auth/microsoft</code>
            </div>
            <p className="mt-2">Microsoft OAuth authentication endpoint</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">
{`// Request
{
  "code": string,
  "redirectUri": string
}

// Response
{
  "user": User,
  "token": string
}`}
            </pre>
          </div>
        </div>
      </div>

      <h3>Tickets</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h4 className="text-lg font-semibold mb-4">Ticket Endpoints</h4>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm font-mono">GET</span>
              <code>/api/tickets</code>
            </div>
            <p className="mt-2">List tickets with optional filters</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">
{`// Query Parameters
{
  status?: TicketStatus
  priority?: Priority
  type?: TicketType
  search?: string
  assignedToId?: string
  linkedProblemId?: string
}

// Response
Ticket[]`}
            </pre>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm font-mono">GET</span>
              <code>/api/tickets/{'{id}'}</code>
            </div>
            <p className="mt-2">Get ticket details</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">
{`// Response
Ticket`}
            </pre>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-mono">POST</span>
              <code>/api/tickets</code>
            </div>
            <p className="mt-2">Create a new ticket</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">
{`// Request
{
  title: string
  description: string
  type: TicketType
  priority: Priority
  category: TicketCategory
  assetId?: string
  customFields?: Record<string, any>
}

// Response
Ticket`}
            </pre>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm font-mono">PATCH</span>
              <code>/api/tickets/{'{id}'}</code>
            </div>
            <p className="mt-2">Update ticket details</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">
{`// Request
Partial<Ticket>

// Response
Ticket`}
            </pre>
          </div>
        </div>
      </div>

      <h3>Assets</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h4 className="text-lg font-semibold mb-4">Asset Endpoints</h4>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm font-mono">GET</span>
              <code>/api/assets</code>
            </div>
            <p className="mt-2">List assets with optional filters</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">
{`// Query Parameters
{
  type?: AssetType
  status?: AssetStatus
  search?: string
  location?: string
}

// Response
Asset[]`}
            </pre>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-mono">POST</span>
              <code>/api/assets</code>
            </div>
            <p className="mt-2">Create a new asset</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">
{`// Request
{
  type: AssetType
  serialNumber: string
  name: string
  status: AssetStatus
  location?: string
  purchaseDate?: string
  warrantyEnd?: string
  notes?: string
}

// Response
Asset`}
            </pre>
          </div>
        </div>
      </div>

      <h3>Chromebooks</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h4 className="text-lg font-semibold mb-4">Chromebook Endpoints</h4>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm font-mono">GET</span>
              <code>/api/chromebooks</code>
            </div>
            <p className="mt-2">List Chromebooks with optional filters</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">
{`// Query Parameters
{
  status?: AssetStatus
  search?: string
  grade?: string
}

// Response
Chromebook[]`}
            </pre>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm font-mono">PATCH</span>
              <code>/api/chromebooks/{'{id}'}/assign</code>
            </div>
            <p className="mt-2">Assign Chromebook to a student</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">
{`// Request
{
  studentId: string
  grade?: number
  notes?: string
}

// Response
Chromebook`}
            </pre>
          </div>
        </div>
      </div>

      <h3>Forms</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h4 className="text-lg font-semibold mb-4">Form Endpoints</h4>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm font-mono">GET</span>
              <code>/api/forms</code>
            </div>
            <p className="mt-2">List forms</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">
{`// Query Parameters
{
  isTemplate?: boolean
}

// Response
Form[]`}
            </pre>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-mono">POST</span>
              <code>/api/forms/submit/{'{formId}'}</code>
            </div>
            <p className="mt-2">Submit form response</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-2">
{`// Request
{
  data: Record<string, any>
  files?: File[]
}

// Response
FormSubmission`}
            </pre>
          </div>
        </div>
      </div>

      <h3>Error Handling</h3>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold mb-4">Error Response Format</h4>
        <pre className="bg-gray-100 p-4 rounded-md">
{`{
  "error": {
    "code": string,
    "message": string,
    "details?: Record<string, any>
  }
}`}
        </pre>

        <h4 className="text-lg font-semibold mt-6 mb-4">Common Error Codes</h4>
        <ul className="list-disc pl-6">
          <li><code>UNAUTHORIZED</code>: Authentication required</li>
          <li><code>FORBIDDEN</code>: Insufficient permissions</li>
          <li><code>NOT_FOUND</code>: Resource not found</li>
          <li><code>VALIDATION_ERROR</code>: Invalid request data</li>
          <li><code>CONFLICT</code>: Resource conflict</li>
          <li><code>INTERNAL_ERROR</code>: Server error</li>
        </ul>
      </div>
    </div>
  );
}