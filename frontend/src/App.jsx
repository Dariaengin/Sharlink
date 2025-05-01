              {/* Other routes here */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/collection/:collectionId" element={<CollectionPage />} />
              <Route path="/collection" element={<CollectionsListPage />} />

              {/* New routes for adding and editing a link */}
              <Route path='/collection/:collectionId/add-link' element={<AddLinkForm />} />
              <Route path='/link/:linkId/edit' element={<EditLinkForm />} />

              {/* Catch-all route for 404 (Not Found) */}
              <Route path='/*' element={<NotFound />} />