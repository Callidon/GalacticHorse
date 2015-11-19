package com.galactichorse;

import com.hp.hpl.jena.rdf.model.*;

import javax.servlet.http.*;
import java.io.*;

public class Ontology extends HttpServlet {
    private static final String ONTOLOGY_PATH = "WEB-INF/accessibility-ontology.ttl";

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        //@TODO: check file extension
        File f = new File(ONTOLOGY_PATH);
        InputStream is = new FileInputStream(f);
        Model model = ModelFactory.createOntologyModel();
        model.read(is, null, "TURTLE");
        model.write(resp.getOutputStream(), "JSON-LD");
    }
}
